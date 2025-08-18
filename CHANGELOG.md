# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Additional patterns and customization options
- Preference for default color on startup
- Optional advanced diagnostics logging

### Fixed
- Minor UI polish in menubar titles and subtitles

## [1.1.0] - 2025-08-18

### Added
- New command: `Luxafor Status` (menu-bar) with real-time color and connectivity
- Global state manager to keep menubar and main UI in sync
- Smart auto-refresh that avoids overwriting recent user actions
- Improved menubar UX with sections, icons, and quick color actions

### Changed
- Transformed project from cheatsheets to a Luxafor device controller
- Cleaned unused cheatsheet code, assets, and scripts

### Fixed
- Build errors related to Raycast color/icon enums
- Menubar reverting to red after actions by tracking state properly

## [1.0.0] - 2025-08-16

### Added
- Initial public release (legacy: Cheatsheets Remastered)