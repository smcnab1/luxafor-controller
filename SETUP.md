# Setup and troubleshooting

## Connect your device

1. Connect a compatible Luxafor device and start the companion app. Check the [vendor's Webhook guide](https://luxafor.helpscoutdocs.com/article/25-webhook-api-basics-and-guidelines) for device and software requirements.
2. Enable **Webhook** mode in the companion app and copy the **User ID**.
3. Open **Raycast Settings → Extensions → Luxafor Controller**.
4. Enter **Luxafor User ID** and select **api.luxafor.com**. The older `.co.uk` option is retained but is not verified as a working regional alternative.
5. Open **Control Luxafor** and choose a color. Check the physical light to confirm the change.

Keep the companion app running. Do not share your User ID in screenshots or issue reports.

## Use the menu bar

Enable **Luxafor Menu Bar Status** in Raycast's extension settings. **Menubar Layout** offers a simple red/green toggle or the full color menu.

The color and online/offline labels come from local state and request results. They are not live device readings, and a green status indicator does not prove the light changed.

## Check a problem

| Problem                                         | What to check                                                                                                        |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| The light does not change                       | Confirm the User ID, device connection and Webhook mode. Use the `.com` endpoint and check your internet connection. |
| A request succeeds but the light stays the same | Check the physical device and restart the companion app. API success alone does not confirm delivery to the light.   |
| The menu bar control is missing                 | Enable **Luxafor Menu Bar Status** in Raycast's extension settings. Restart Raycast if needed.                       |
| The displayed color is wrong                    | Use the physical light as the reference. The extension cannot read its actual LED state.                             |

**Test Connection** changes the light: it sends a red command, and the current `main` implementation sends it even if you cancel the dialog. It does not restore the previous color. Use it only when you intend to send red, then choose another color yourself.

Still having trouble? [Open an issue](https://github.com/smcnab1/luxafor-controller/issues) with your device model, Raycast version and steps to reproduce. Remove your User ID and any private information first.
