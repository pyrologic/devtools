# Pyrologic Rollup Plugin

## About

The Pyrologic Rollup Plugin provides two plugins for [rollup.js](https://rollupjs.org/guide/en/):
1. a build time stamp plugin and
2. a build info plugin; 

## Installation

Use you preferred package manager to install the plugin as "dev dependency".

npm example:
```
npm install @pyrologic/rollup-plugin --save-dev
```

yarn example:

```
yarn add @pyrologic/rollup-plugin --dev
```

## Usage

Import the plugin in your `rollup.config.js` file:
```js
import { PyrologicRollupPlugin } from "@pyrologic/rollup-plugin";
```

Note: It has to be a named import as shown above. Otherwise rollup will fail.

Register the provided plugins as wanted:
```js
// get the plugin instance
const plugin = PyrologicRollupPlugin.getInstance();

// and adjust your configuration as needed
const config = {
    input: 'src/index.js',
    output: {
        file: 'dist/myproject.js',
        name: 'myProject',
        format: 'iife',
        sourcemap: true,
        plugins: [ ]
    },
    plugins: [
        plugin.timestampPlugin('My cool project'),
        plugin.infoPlugin()
    ]
}
export default config;
```
That's it!

## Advanced

The Pyrologic Rollup Plugin has a warning counter. You can forward any warning that rollup issues to the plugin.

To do so, extend your rollup configuration like this:
```js
const config = {
    input: 'src/index.js',
    output: {
        // ... see above ...
    },
    plugins: [
        plugin.timestampPlugin('My cool project'),
        plugin.infoPlugin()
    ],
    onwarn ( { loc, frame, message } ) {
        plugin.onwarn( { loc, frame, message } );
    }
}
```

This way, every warning is prefixed by a number.

