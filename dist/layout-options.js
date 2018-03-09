'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var FLEX_STRING_VALUES = ['none', 'initial', 'auto', 'grow', 'nogrow', 'noshrink', ''];
var ALIGNMENT_MAIN_AXIS = ['start', 'center', 'end', 'stretch', 'space-around', 'space-between'];
var ALIGNMENT_CROSS_AXIS = ['start', 'center', 'end', 'stretch'];
var BREAKPOINTS = ['', 'xs', 'gt-xs', 'sm', 'gt-sm', 'md', 'gt-md', 'lg', 'gt-lg', 'xl', 'print'];
var UNDEFINED_VALUE = undefined;

var BREAKABLE_LAYOUT_OPTIONS_TEMPLATE = [{
    name: 'layout',
    values: ['row', 'column']
}, {
    name: 'flex',
    values: [].concat(_toConsumableArray(getNumericValues(21, function (index) {
        return index * 5;
    })), _toConsumableArray(getNumericValues(2, function (index) {
        return (index + 1) * 33;
    })), FLEX_STRING_VALUES, [UNDEFINED_VALUE])
}, {
    name: 'flex-order',
    values: getNumericValues(41, function (index) {
        return index - 20;
    })
}, {
    name: 'flex-offset',
    values: [].concat(_toConsumableArray(getNumericValues(20, function (index) {
        return index * 5;
    })), _toConsumableArray(getNumericValues(2, function (index) {
        return (index + 1) * 33;
    })))
}, {
    name: 'layout-align',
    values: ALIGNMENT_MAIN_AXIS.reduce(function (accumulator, mainValue) {
        return [].concat(_toConsumableArray(accumulator), _toConsumableArray(ALIGNMENT_CROSS_AXIS.map(function (crossValue) {
            return mainValue + ' ' + crossValue;
        })), _toConsumableArray(ALIGNMENT_CROSS_AXIS.map(function (crossValue) {
            return mainValue + '-' + crossValue;
        })));
    }, [])
}, {
    name: 'show',
    values: [UNDEFINED_VALUE]
}, {
    name: 'hide',
    values: [UNDEFINED_VALUE]
}, {
    name: 'layout-margin',
    values: [UNDEFINED_VALUE]
}, {
    name: 'layout-padding',
    values: [UNDEFINED_VALUE]
}];

var UNBREAKABLE_LAYOUT_OPTIONS_TEMPLATE = [{
    name: 'layout-wrap',
    values: [UNDEFINED_VALUE]
}, {
    name: 'layout-nowrap',
    values: [UNDEFINED_VALUE]
}, {
    name: 'layout-no-wrap',
    values: [UNDEFINED_VALUE]
}, {
    name: 'layout-fill',
    values: [UNDEFINED_VALUE]
}];

var LAYOUT_OPTIONS = BREAKABLE_LAYOUT_OPTIONS_TEMPLATE.reduce(function (accumulator, _ref) {
    var name = _ref.name,
        values = _ref.values;
    return [].concat(_toConsumableArray(accumulator), _toConsumableArray(BREAKPOINTS.map(function (breakpoint) {
        return {
            name: [name, breakpoint].filter(Boolean).join('-'),
            values: [].concat(_toConsumableArray(values))
        };
    })));
}, [].concat(UNBREAKABLE_LAYOUT_OPTIONS_TEMPLATE));

exports.default = LAYOUT_OPTIONS;


function getNumericValues(valuesAmount, transformerFn) {
    return new Array(valuesAmount).fill(0).map(function (value, index) {
        return String(transformerFn(index));
    });
}