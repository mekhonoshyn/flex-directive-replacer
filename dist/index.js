'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.webpackLoaderPath = exports.gulpPlugin = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpPlugin = require('./gulp-plugin');

var _gulpPlugin2 = _interopRequireDefault(_gulpPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpackLoaderPath = _path2.default.join(__dirname + ', \'webpack-loader\'');

exports.gulpPlugin = _gulpPlugin2.default;
exports.webpackLoaderPath = webpackLoaderPath;