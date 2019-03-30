# Ember QUnit Testem launcher

Opens Testem URL for current test file module

## Features

**Testem: Start server and open module** command:

1. Checks if Testem server can be reached
2. Starts Testem command in integrated terminal if not and waits for server to be running
3. Opens URL in your default browser with `moduleId` of the topmost module in the current open file

## Requirements

None

## Extension Settings

* **testemLauncher.testemStartServerCmd** - shell command used to start Testem server. Override if you use custom script.
* **testemLauncher.testemServerURL** - base URL of Testem server. Override if you run Testem remotely or on different port.
* **testemLauncher.testemURLSessionId** - number used to append to the URL which identifies the browser session in Testem console. 

## Install

Install from Extensions market place: 

https://marketplace.visualstudio.com/items?itemName=DocX.ember-qunit-testem-launcher

Or build locally:

```
npm install -g vsce
vsce package
```

Then install the generated `vsxi` file from Extensions menu in VS Code 
