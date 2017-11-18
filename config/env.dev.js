var webpackMerge = require("webpack-merge");

var config = {
  JS_PATH: "/bundle.js",
  DEV: true
}

module.exports = function(env, defaultConfig) {
  return webpackMerge(defaultConfig, config);
};
