'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.raw = exports.default = undefined;

var _helper = require('./helper');

var IS_RAW = true;

exports.default = flexDirectiveReplacerLoader;
exports.raw = IS_RAW;


function flexDirectiveReplacerLoader(source) {
    this.cacheable();

    return (0, _helper.transformSource)(source.toString());
}