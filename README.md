# Luxafor Controller

Change your Luxafor light from Raycast. Set a color, blink the light or switch it off, with quick controls in the menu bar.

[Install from the Raycast Store](https://www.raycast.com/smcnab1/luxafor-controller) · macOS

## Setup

You'll need a compatible Luxafor device and the Luxafor companion app running with **Webhook** mode enabled. The [Luxafor Webhook guide](https://luxafor.helpscoutdocs.com/article/25-webhook-api-basics-and-guidelines) lists supported devices and software.

1. Copy your **User ID** from the Luxafor app's **Webhook** tab.
2. Open **Raycast Settings → Extensions → Luxafor Controller**.
3. Enter **Luxafor User ID** and select **api.luxafor.com** as the API endpoint.
4. Open **Control Luxafor** and choose a color or **Turn Off**.

Keep the companion app running while using the extension. The older `api.luxafor.co.uk` option is retained, but its current operation is unverified; use the documented `.com` endpoint.

## Commands

| Command                 | What it does                                            |
| ----------------------- | ------------------------------------------------------- |
| Control Luxafor         | Set a solid color, blink a color or turn the light off. |
| Luxafor Menu Bar Status | Change colors from the menu bar.                        |

Choose red, green, blue, yellow, cyan, magenta or white. In **Control Luxafor**, open Actions on a color to blink it. **Menubar Layout** in extension settings offers a simple red/green toggle or the full color menu.

The displayed color and online/offline labels are inferred from local history and requests. They cannot confirm the light's actual state. **Test Connection** sends a red command and may leave the light red; check the device yourself and choose another color afterwards.

## Troubleshooting

If the light does not change, check the User ID, device connection and Webhook mode, then restart the companion app if needed. A successful API response alone does not confirm that the light changed.

For menu bar controls, enable **Luxafor Menu Bar Status** in Raycast's extension settings. See [setup and troubleshooting](SETUP.md) for more detail, or [report a bug or request a feature](https://github.com/smcnab1/luxafor-controller/issues). Keep your User ID out of issue reports and screenshots.

## Development

Use macOS, Raycast, npm and Node.js 22.14.0 or newer (the locked CLI’s minimum):

```bash
npm ci
npm run build
npm run dev
```

`npm run dev` registers the development extension in Raycast. This README describes the source on `main`; the [request-history update](https://github.com/raycast/extensions/pull/33069) is being prepared separately.

See the [changelog](CHANGELOG.md), [roadmap](ROADMAP.md) and [release checklist](RELEASE_CHECKLIST.md). Contributions are welcome through issues and pull requests.

[MIT licensed](LICENSE).
