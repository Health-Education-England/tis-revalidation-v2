// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("karma-mocha-reporter"),
      require("@angular-devkit/build-angular/plugins/karma")
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/revalidation"),
      reporters: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true
    },
    reporters: ["mocha", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DISABLE,
    browserConsoleLogOptions: {
      level: "error",
      format: "%b %T: %m",
      terminal: true
    },
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
    mochaReporter: {
      autowatch: true,
      ignoreSkipped: true,
      maxLogLines: -1
    },
    specReporter: {
      suppressSkipped: true
    }
  });
};
