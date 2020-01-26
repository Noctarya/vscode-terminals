# <img src="./img/logo.png"  height="45" width="45" align="center"> Terminal StatusBar

Adds icons for each terminal process to the status bar.

![Preview with index](./img/preview_withIndex.png)

![Preview with index and name](./img/preview_withIndexAndName.png)

## Commands

| Command               | Description                                   |
| --------------------- | --------------------------------------------- |
| Create Terminal       | Create a new terminal.                        |
| Close All Terminals   | Close all existing terminal processes.        |
| Close Active Terminal | Closes the currently active terminal process. |

## Configuration

### Prefix: terminalStatusBar

| Property              | Typ                                        | Description                                                                                                                                                                                 |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxTerminalIcons      | number                                     | Maximum number of icons displayed.                                                                                                                                                          |
| preferLatestTerminals | boolean                                    | Prefer the latest terminals if the maximum number of displayed icons is exceeded.                                                                                                           |
| showTerminalIndex     | boolean                                    | Shows the terminal index next to the icon in the status bar.                                                                                                                                |
| showTerminalName      | boolean                                    | Shows the terminal name next to the icon in the status bar.                                                                                                                                 |
| startupTerminals      | [ { id: string, startupCommand?: string} ] | Defines a list of terminals to be opened when vscode is started. Each terminal must have an id, which is treated as a terminal name and, optionally, a command that is executed at startup. |

### Example

```
{
  "terminalStatusBar.maxTerminalIcons": 3,
  "terminalStatusBar.preferLatestTerminals": true,
  "terminalStatusBar.showTerminalIndex": false
  "terminalStatusBar.showTerminalName": false,
  "terminalStatusBar.startupTerminals": [
    {
      "id": "devServer",
      "startupCommand": "npm run dev"
    }
  ]
}
```
