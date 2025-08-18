# Luxafor Controller for Raycast

Control your Luxafor LED device directly from Raycast with this extension.

## Features

- **Basic Controls**: Turn device on/off, set solid colors (red, green, blue, yellow, cyan, magenta, white)
- **Patterns**: Start predefined light patterns like police lights, traffic lights, and random patterns
- **Blink Effects**: Make your device blink with any of the basic colors
- **Connection Testing**: Test if your device is reachable
- **Easy Configuration**: Simple setup with your Luxafor User ID
- **Menubar Status**: Real-time status indicator in your menubar showing current color and device status

## Commands

### Control Luxafor
Main interface for controlling your device with full color options and patterns.

### Luxafor Status (Menubar)
Shows real-time device status in your menubar:
- **Color indicator**: Shows current device color with matching icon tint
- **Online/offline status**: Real-time connection status
- **Quick actions**: Turn off, set red/green/blue directly from menubar
- **Last action**: Shows what was last performed
- **Auto-refresh**: Updates every 30 seconds (won't overwrite recent user actions)

## Setup

1. **Get your Luxafor User ID**:
   - Open Luxafor software
   - Go to the "Webhook" tab
   - Copy your User ID

2. **Configure the extension**:
   - Open Raycast preferences
   - Go to Extensions → Luxafor Controller
   - Enter your User ID
   - Choose your preferred API endpoint

3. **Enable menubar status** (optional):
   - The "Luxafor Status" command will appear in your menubar
   - Shows current device color and status
   - Provides quick access to common actions

## Usage

- **Control Luxafor**: Main control interface
- **Menubar**: Click the colored circle icon for quick actions
- Test connection first to ensure everything works
- All actions show success/failure feedback

## Notes

- This extension uses the official Luxafor Webhook API. It cannot read the device's actual LED state; instead, it tracks the most recent action and avoids auto-refresh from clobbering your choice.
- If the Luxafor app is not running or webhook mode is disabled, requests will fail.

## Troubleshooting

- Ensure your **User ID** is correct (from the Luxafor app → Webhook tab)
- Verify the chosen **API endpoint** matches your region
- Keep the **Luxafor app running** (Webhook mode)
- Try **Test Connection** to verify connectivity
- If actions succeed but LEDs don't change, replug the device and restart the Luxafor app

## Supported Devices

- Luxafor Flag
- Luxafor Colorblind Flag  
- Luxafor Orb
- Luxafor Bluetooth Pro
- Luxafor Bluetooth

## API Endpoints

- `api.luxafor.com` (US)
- `api.luxafor.co.uk` (UK)

## Development

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

## References

- Luxafor Webhook API basics and endpoints: [Help Scout Docs](https://luxafor.helpscoutdocs.com/article/25-webhook-api-basics-and-guidelines), [Luxafor UK](https://luxafor.co.uk/webhook-api/)

## License

MIT