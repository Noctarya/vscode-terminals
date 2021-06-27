# Change Log

All notable changes to the "Extended Terminal Integration" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.2] - 2021-06-27

### Fixed

- Updating vulnerable dependencies

## [0.4.1] - 2020-05-16

### Fixed

- Updating vulnerable dependency (acorn from 7.1.0 to 7.1.1)

## [0.4.0] - 2020-02-17

### Added

- Add a configuration option to filter the terminal processes to be displayed in the status bar based on a whitelist or blacklist.
- Highlight the active terminal process.
- Add a configuration option to customize the color of the displayed terminal processes in the status bar.

### Changed

- Change the prefix of the configuration parameters.
- Allow multiple commands to be executed when the startupTerminal starts.

## [0.3.1] - 2020-01-30

### Added

- Add a configuration option to customize the interval that updates the name of the displayed terminal processes in the status bar.

### Fixed

- Update the name of the displayed terminal processes in the status bar.

## [0.3.0] - 2020-01-29

### Changed

- Change and publish the extension under another id and adjust configuration parameters accordingly.

## [0.2.0] - 2020-01-26

### Added

- Add a configuration option to define terminals which should be started automatically when vscode starts and allow the automatic execution of commands.
- Validate the configuration and use default values for invalid parameters.
- Log the currently used configuration.
- Create a command to close all terminal processes.
- Create a command to close the currently active terminal process.

## [0.1.0] - 2020-01-25

### Added

- Display an icon for each open terminal process.
- Create a command to open a new terminal process.
- Add configuration options to customize the name and the number of terminal processes to be displayed in the status bar.
- Add a configuration option to determine whether the newest or the oldest terminal processes should be preferred if more terminal processes are open than should be displayed in the status bar.
