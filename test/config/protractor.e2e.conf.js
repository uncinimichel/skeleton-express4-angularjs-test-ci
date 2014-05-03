module.exports.config = {
    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs: [
        '../e2e/features/**/*.feature'
    ],

    // ----- The test framework -----
    //
    // Jasmine and Cucumber are fully supported as a test and assertion framework.
    // Mocha has limited beta support. You will need to include your own
    // assertion framework if working with mocha.
    framework: 'cucumber',

    // ----- Options to be passed to cucumber -----
    cucumberOpts: {
        // Require files before executing the features.v
        require: 'test/e2e/step-definitions.js',
        // Only execute the features or scenarios with tags matching @dev.
        tags: '@dev',
        // How to format features (default: progress)
        format: 'summary'
    }
};