var webpackMerge = require("webpack-merge");

var config = {
  JS_PATH: "/build/bundle.js",
  DEV: false
}

module.exports = function(env, defaultConfig) {
  return webpackMerge(defaultConfig, config);
};
