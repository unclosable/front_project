var webpackMerge = require("webpack-merge");

var config = {
  JS_PATH: "/build/bundle.js",
  DEV: false,
  SERVER_HOST: '43.241.234.241',
  SERVER_PORT: 10002
}

module.exports = function(env, defaultConfig) {
  return webpackMerge(defaultConfig, config);
};
