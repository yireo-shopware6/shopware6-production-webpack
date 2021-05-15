const path = require('path');
const exec = require('child_process').exec;

const inputFile = path.resolve(process.env.PLUGIN_FOLDER, 'src/Resources/app/storefront/src/main.js');
const outputPath = path.resolve(process.env.PLUGIN_FOLDER, 'src/Resources/app/storefront/dist/storefront/js/');
const outputFile = 'main.js';
const shopwareRoot = __dirname;
const storefrontRoot = path.resolve(shopwareRoot, 'vendor/shopware/storefront/Resources/app/storefront');
const themeCompileCommandOptions = (typeof process.env.THEME_COMPILE_OPTIONS !== 'undefined') ? process.env.THEME_COMPILE_OPTIONS : '';
const themeCompileCommand = 'bin/console theme:compile ' + themeCompileCommandOptions;

module.exports = {
    mode: process.env.NODE_ENV,
    entry: inputFile,
    output: {
        filename: outputFile,
        path: outputPath,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.resolve(shopwareRoot, 'node_modules')
        ],
        alias: {
            src: path.resolve(storefrontRoot, 'src'),
            assets: path.resolve(storefrontRoot, 'assets'),
            scss: path.resolve(storefrontRoot, 'src/scss'),
            vendor: path.resolve(storefrontRoot, 'vendor')
        }
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec(shopwareRoot + '/' + themeCompileCommand, (err, stdout, stderr) => {
                        if (stdout) process.stdout.write(stdout);
                        if (stderr) process.stderr.write(stderr);
                    });
                });
            }
        }
    ]
};
