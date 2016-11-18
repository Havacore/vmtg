module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: ['karma.entry.js'],

    preprocessors: {
      'karma.entry.js': ['webpack']
    },

    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true
    },

    reporters: ['dots'],

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,
    plugins: [
      require('karma-webpack'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-teamcity-reporter')
    ],

    browsers: ['PhantomJS']
  });
};
