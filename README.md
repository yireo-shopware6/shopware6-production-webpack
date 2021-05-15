# Shopware 6 Webpack configuration for Production Template
These files allow you to compile JavaScript in your plugins, while using the Production Template.

## Setup & usage
- Copy the files `package.json` and `webpack.config.prod.js` to the root of your project
- Run `yarn install`
- Modify `package.json` to add a new `build` and `watch` with the path to your plugin specified in the constant `PLUGIN_FOLDER`

Run `yarn build` with the `PLUGIN_FOLDER` set to compile all sources for production:

    PLUGIN_FOLDER=custom/plugins/SwagExample yarn build

Run `yarn watch` with the `PLUGIN_FOLDER` set to compile all sources for development and keep watching
all files:

    PLUGIN_FOLDER=custom/plugins/SwagExample yarn watch

## Todo
The Webpack build includes a post-script to run `bin/console theme:compile`.
Unfortunately, this usually takes about 3.5 seconds before finishing, largely due to
CSS. The [PR 1863](https://github.com/shopware/platform/pull/1863) adds an option
`skip-css` to the command to allow quicker completion. This could be used again with
this Webpack build as so:

    THEME_COMPILE_OPTIONS='-k --skip-css' PLUGIN_FOLDER=custom/plugins/SwagExample yarn build
