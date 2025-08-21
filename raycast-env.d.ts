/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Luxafor User ID - Your Luxafor User ID from the Webhook tab in Luxafor software */
  "userId": string,
  /** API Endpoint - Choose your preferred API endpoint */
  "apiEndpoint": "com" | "co.uk",
  /** Menubar Layout - Choose between simple toggle or full color control */
  "menubarMode": "simple" | "full",
  /** Enable Debug Mode - Show detailed debug information and logging */
  "debugMode": boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `control-luxafor` command */
  export type ControlLuxafor = ExtensionPreferences & {}
  /** Preferences accessible in the `luxafor-status` command */
  export type LuxaforStatus = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `control-luxafor` command */
  export type ControlLuxafor = {}
  /** Arguments passed to the `luxafor-status` command */
  export type LuxaforStatus = {}
}

