var istanbul = require('istanbul');
var bistanbul = require('browserify-babel-istanbul');
var babelify = require('babelify');

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
                babelify,
                bistanbul({
                    instrumenterConfig: {
                        noCompact: true
                    },
                    ignore: ['**/node_modules/**', '**/tests/**', '**/sandbox/**']
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
