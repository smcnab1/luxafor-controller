# Luxafor Controller · Roadmap

This document tracks planned updates and ideas for future versions of **Luxafor Controller**.
Timelines are indicative and may shift based on feedback and usage.

---

## 1.1.0 — Preferences & Shortcuts

* ⚙️ Startup colour preference: remember & restore last colour on launch
* ⏱️ Blink duration control (1s / 2s / 5s presets)
* 🎨 Custom hex colour input (picker or text field)
* 📜 Colour history: last 5–10 colours for quick access
* ⌨️ Global hotkeys for common actions (red/green toggle, turn off)
* 🛡️ Enhanced error handling with friendly retry suggestions

---

## 1.2.0 — Quick Actions & Menubar

* 🎯 Quick Actions command: define frequently used colour combos
* 🎨 Menubar: custom hex colours & recent colour shortcuts
* ⚡ Faster switching between solid colours & blink modes
* 🛡️ Error recovery: automatic retry with exponential backoff

---

## 1.3.0 — Presets & Schedules

* ⭐ Named colour presets (Work Mode / Focus Time / Break)
* 🔄 Pattern sequences: multi-step transitions (red → yellow → green)
* ⏰ Daily schedules: set time-based colour changes (e.g. morning = blue)
* 📅 Workspace integration: auto-colour from calendar / Slack / focus mode
* 💡 Advanced blink patterns: wave, fade, and custom sequences

---

## 1.4.0 — Device Enhancements

* 🔌 Device-specific features: optimise for Flag, Orb, Bluetooth models
* 🗂️ Status persistence: restore last colour after reboot
* 🔥 Colour temperature support: warm/cool white & brightness slider
* 📡 Multi-device support: control multiple Luxafor devices simultaneously

---

## 1.5.0 — Integrations & Automation

* 🌐 Webhook integration: trigger colours from GitHub / CI results
* 🤖 Automation rules: “If X happens, set colour to Y”
* 📊 Performance monitoring: track response times & device health
* 🔄 Offline mode: queue actions until device reconnects

---

## Backlog / Ideas

* 🔗 Slack & Teams presence sync via API/webhooks
* 📲 Mobile companion app (iOS/Android) for remote control
* 🧩 Plugin system: allow custom integrations & patterns
* 🚀 CI/CD: automated release workflow to Raycast Store

---

## ✅ Released

### v1.0.0 — Initial Public Release

* ✨ Control Luxafor LED devices directly from Raycast
* 🎨 Set solid colours, patterns, and animations
* 📊 Real-time status monitoring of connected devices
* ⚡ Quick colour presets for common lighting scenarios
* 🖥️ Two commands: `Control Luxafor` & `Luxafor Status`
* 🛠️ Core logic in `luxafor-service.ts` with state in `luxafor-state.ts`

---

## 🔧 Technical Improvements

* 🔄 State synchronisation between menubar & main command
* 🧠 Memory optimisation: fewer re-renders & state updates
* 🛠️ Structured logging & debugging system
* 🧪 Unit tests for core device control logic
* ⚡ Performance profiling & optimisation

---

## Contributing

This extension is primarily maintained via the [Raycast Store feedback system](https://github.com/raycast/extensions/issues/new?title=%5BLuxafor+Controller%5D+...&template=extension_feature_request.yml&labels=extension%2Cfeature%2Brequest&extension-url=https%3A%2F%2Fwww.raycast.com%2Fsmcnab1%2Fluxafor-controller&body=%0A%3C%21--%0APlease+update+the+title+above+to+consisely+describe+the+issue%0A--%3E%0A%0A%23%23%23+Extension%0A%0A%23%7Brepository_url%28extension.latest_version%29%7D%0A%0A%23%23%23+Description%0A%0A%3C%21--%0ADescribe+the+feature+and+the+current+behavior%2Fstate.%0A--%3E%0A%0A%23%23%23+Who+will+benefit+from+this+feature%3F%0A%0A%23%23%23+Anything+else%3F%0A%0A%3C%21--%0ALinks%3F+References%3F+Anything+that+will+give+us+more+context%21%0ATip%3A+You+can+attach+images+or+log+files+by+clicking+this+area+to+highlight+it+and+then+dragging+files+in.%0A--%3E%0A%0A).
Feature requests and bug reports should be submitted there.

If you’d like to contribute code or ideas directly, please open an issue or PR on GitHub.

---