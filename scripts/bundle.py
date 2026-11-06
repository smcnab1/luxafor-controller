"""Build locally, normalise source-map paths, and atomically write the candidate."""
import json
import os
from pathlib import Path
import subprocess
import tempfile
import zipfile

root = Path(__file__).resolve().parent.parent
manifest = json.loads((root / "package.json").read_text())
output = root / "artifacts" / f"luxafor-controller-{manifest['version']}.rayext"
output.parent.mkdir(exist_ok=True)
# The CLI embeds dependency sources as well as the extension sources. Verify
# dependency content against the installed package's own maps before retaining it.
vendor_sources = {}
for vendor_map in (root / "node_modules/@raycast/utils/dist").glob("*.js.map"):
    vendor = json.loads(vendor_map.read_text())
    for source, content in zip(vendor["sources"], vendor["sourcesContent"], strict=True):
        relative = (vendor_map.parent / source).relative_to(root).as_posix()
        if relative in vendor_sources and vendor_sources[relative] != content:
            raise ValueError("Installed dependency source maps disagree")
        vendor_sources[relative] = content
with tempfile.TemporaryDirectory(prefix="luxafor-bundle-") as temporary:
    raw = Path(temporary) / "raw.rayext"
    clean = Path(temporary) / "clean.rayext"
    subprocess.run(["node", str(root / "node_modules/@raycast/api/bin/run.js"),
                    "bundle", "-o", str(raw)], cwd=root, check=True)
    with zipfile.ZipFile(raw) as source, zipfile.ZipFile(clean, "w") as target:
        for name in source.namelist():
            data = source.read(name)
            if name == "package.json":
                packaged = json.loads(data)
                for field in ("devDependencies", "scripts", "overrides"):
                    packaged.pop(field, None)
                data = json.dumps(packaged, indent=2).encode() + b"\n"
            if name.endswith(".map"):
                sourcemap = json.loads(data)
                paths = []
                contents = []
                for path, content in zip(sourcemap["sources"], sourcemap["sourcesContent"], strict=True):
                    marker = root.as_posix() + "/"
                    if path == "raycast-shared:dequal":
                        module_path = root / "node_modules/dequal/lite/index.mjs"
                        expected = f'exports["dequal/lite"] = () => require("{module_path.as_posix()}");'
                        if content != expected or not module_path.is_file():
                            raise ValueError("Unexpected CLI shared-module source")
                        paths.append(path)
                        contents.append(content.replace(marker, ""))
                        continue
                    if marker not in path:
                        raise ValueError("Unexpected source-map origin")
                    relative = path.split(marker, 1)[1]
                    actual = root / relative
                    if relative.startswith("src/"):
                        if not actual.resolve().is_relative_to(root / "src") or actual.read_text() != content:
                            raise ValueError("Bundle source differs from the candidate")
                    elif relative.startswith("node_modules/") and actual.is_file():
                        if not actual.resolve().is_relative_to(root / "node_modules") or actual.read_text() != content:
                            raise ValueError("Bundle dependency differs from installed source")
                    elif relative not in vendor_sources or vendor_sources[relative] != content:
                        raise ValueError("Bundle dependency source differs from installed maps")
                    paths.append(relative)
                    contents.append(content)
                sourcemap["sources"] = paths
                sourcemap["sourcesContent"] = contents
                data = json.dumps(sourcemap, separators=(",", ":")).encode()
            if name.endswith((".json", ".map", ".js", ".md")):
                for forbidden in (b"/Users/", b"/private/var/", b"synthetic-", b"mock-transport", b"review/"):
                    if forbidden in data:
                        raise ValueError(f"Unexpected development content in {name}")
            item = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            item.external_attr = source.getinfo(name).external_attr
            item.compress_type = zipfile.ZIP_DEFLATED
            target.writestr(item, data, compresslevel=9)
    # The temporary directory may be on another filesystem.
    with tempfile.NamedTemporaryFile(dir=output.parent, delete=False) as staged:
        staged.write(clean.read_bytes())
        staged_name = staged.name
    os.replace(staged_name, output)
print(f"Sanitised candidate: {output}")
