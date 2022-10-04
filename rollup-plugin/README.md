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

### Count and write warning messages

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

### Filter warning messages

At some point rollup.js issues "Circular dependency" warnings, if two modules import each other for instance.
Sometimes, this may indicate a serious error. But there are situations where these warnings are harmless yet
unavoidable.

You can instruct the Pyrologic Rollup Plugin to ignore "Circular dependency" warnings. In order to do so,
just initialize the plugin with an object that has the property `filterCDWarning` set to `true`:

```js
const config = {
    input: 'src/index.js',
    output: {
        // ... see above ...
    },
    plugins: [
        plugin.timestampPlugin('My cool project'),
        // pass an object with the property "filterCDWarning" set to true
        plugin.infoPlugin( { filterCDWarning: true } )
    ],
    onwarn ( { loc, frame, message } ) {
        plugin.onwarn( { loc, frame, message } );
    }
}
```

### Verbose output

To get more information about the build process you can instruct the Pyrologic Rollup Plugin to write a more
verbose build summary. Ath the moment this is is the number of filtered out warning messages (see above).

Just set the option `verboseOutput` to `true`:

```js
// ... see above ...
    plugins: [
        plugin.timestampPlugin('My cool project'),
        // pass an object with the properties "verboseOutput" and "filterCDWarning" set to true
        plugin.infoPlugin( { verboseOutput: true, filterCDWarning: true } )
    ],
// ... etc. ...
```

Note: If `filterCDWarning` is left at `false` then `verboseOutput` has no effect.


### Summary of options

The Pyrologic Rollup Plugin recognizes the following options:

| Option name | Type | Default value | Description |
| ------------| ---- | ------------- | ----------- |
| verboseOutput | Boolean | `false` | If set to `true` then the plugin writes more information to the console. |
| filterCDWarning | Boolean | `false` | If set to `true` then the plugin filters "Circular dependency" warnings. | 


<sub>_End Of Document_</sub>
