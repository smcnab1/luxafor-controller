# Published-source reconciliation

Verified on 6 November 2026.

[Raycast PR #33069](https://github.com/raycast/extensions/pull/33069) merged at `dad9bf13278a1de9d8382af59596ee8979d08ffa`; the Store bot confirmed publication. This repository reconciles the complete published extension subtree from [`raycast/extensions` at `55f1183e9ad185a363d97a19bca57f222719e510`](https://github.com/raycast/extensions/tree/55f1183e9ad185a363d97a19bca57f222719e510/extensions/luxafor-controller), including reviewer/image-optimisation changes and the resolved changelog.

The accepted manifest is 1.1.0. Its published changelog says 5 November 2026; those upstream bytes are preserved even though the merge/publication events occurred on 6 November. No date or version has been invented.

## What matches

All accepted production source, assets, Store metadata, README media, setup guidance, changelog, TypeScript and ESLint configuration are retained byte-for-byte. The six commands, preference keys, request-history schema and transport/locking behaviour match the published source. Every pre-existing accepted dependency lock entry keeps its version.

## Intentional personal differences

- `README.md` keeps the polished layout, describes the now-published six commands and includes personal development links/instructions.
- `package.json` keeps the accepted runtime dependencies and adds offline test dependencies/scripts and the local bundle command. `package-lock.json` adds that test-only graph; it is not the Store lockfile.
- `.gitignore` additionally excludes generated archives, coverage and historical review outputs. Generated `raycast-env.d.ts` and the old hardware-writing `test-api.js` are no longer tracked.
- `tests/`, the test TypeScript/Vitest configs and `scripts/bundle.py` are personal development material, retained outside Store submission. The 118-test suite includes the final submission's UI-race regressions.
- `AGENTS.md`, release checklist/template, roadmap and GitHub workflows are personal maintenance files. The old auto-overwrite sync workflow is now a manual read-only comparison.

The original dirty local candidate, its review/artifact history and unique branches are preserved separately; they are not silently merged as production fixes. Historical remote release/dependency branches remain intact.

## Future development

Use `release/next-raycast-update` from reconciled `main`. There is no invented next version or pre-emptive changelog entry. Choose scope and version when the next update is prepared; keep dependency maintenance separate from accepted-source parity.

The existing minimatch tooling advisory remains in the accepted graph; no forced override is introduced by this reconciliation. Build, mock tests and Store publication do not qualify genuine installation/upgrade, hardware effects, full menu lifecycle or accessibility/appearance checks. Those remain separate acceptance work.

A v1.1.0 source tag is identifiable from the accepted manifest, but a standalone GitHub release/tag is separate from Store publication. No tag or release is created by this maintenance task; no unverified archive is uploaded as a release asset.
