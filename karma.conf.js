var istanbul = require('browserify-istanbul');

module.exports = function(config) {
    config.set({
        singleRun: true,

        frameworks: ['mocha', 'browserify'],

        files: [
            './tests/*.js',
            './src/*.js'
        ],

        preprocessors: {
            './tests/*.js': ['browserify'],
            './src/*.js': ['browserify']
        },

        reporters: ['mocha', 'coverage'],

        plugins: [
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-browserify'
        ],

        coverageReporter: {
            // specify a common output directory
            dir: 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'text-summary' },
                { type: 'lcov'}
            ]
        },

        browserify: {
            debug: true,
            transform: [
                'brfs',
                istanbul({
                    ignore: ['**/node_modules/**']
                })
            ]
        },

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // see what is going on
        logLevel: 'LOG_INFO'
    });
};
