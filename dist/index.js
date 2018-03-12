'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.webpackLoaderPath = exports.gulpPluginPath = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulpPluginPath = _path2.default.join(__dirname, 'gulp-plugin');
var webpackLoaderPath = _path2.default.join(__dirname, 'webpack-loader');

exports.gulpPluginPath = gulpPluginPath;
exports.webpackLoaderPath = webpackLoaderPath;