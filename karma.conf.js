var istanbul = require('istanbul');
var bistanbul = require('browserify-istanbul');

module.exports = function (config) {
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
            dir: 'coverage',
            reporters: [
                { type: 'lcov', subdir: 'lcov' },
                { type: 'html', subdir: 'html' },
                { type: 'text-summary' },
                { type: 'cobertura', subdir: '.' }
            ],
            sourceStore : istanbul.Store.create('fslookup')
        },

        browserify: {
            debug: true,
            plugin: ['proxyquire-universal'],
            transform: [
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
        logLevel: 'LOG_ERROR'
    });
};
