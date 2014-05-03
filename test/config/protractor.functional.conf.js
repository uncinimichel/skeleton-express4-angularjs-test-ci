// Note that this will be overridden by protractor.options.js

module.exports.config = {
    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs: [
        '../client/functional/**/*.js'
    ],

    allScriptsTimeout: 20000
};