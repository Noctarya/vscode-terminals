# <img src="./img/logo.png"  height="45" width="45" align="center"> Terminal StatusBar

Adds icons for each terminal process to the status bar.

![Preview with index](./img/preview_withIndex.png)

![Preview with index and name](./img/preview_withIndexAndName.png)

## Commands

| Command         | Description           |
| --------------- | --------------------- |
| Create Terminal | Create a new terminal |

## Configuration

### Prefix: terminalStatusBar

| Property              | Typ     | Description                                                                      |
| --------------------- | ------- | -------------------------------------------------------------------------------- |
| maxTerminalIcons      | number  | Maximum number of icons displayed                                                |
| preferLatestTerminals | boolean | Prefer the latest terminals if the maximum number of displayed icons is exceeded |
| showTerminalIndex     | boolean | Shows the terminal index next to the icon in the status bar.                     |
| showTerminalName      | boolean | Shows the terminal name next to the icon in the status bar.                      |

### Example

```
{
  "terminalStatusBar.maxTerminalIcons": 3,
  "terminalStatusBar.preferLatestTerminals": true,
  "terminalStatusBar.showTerminalIndex": false
  "terminalStatusBar.showTerminalName": false,
}
```
