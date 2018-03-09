'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _layoutOptions = require('./layout-options');

var _layoutOptions2 = _interopRequireDefault(_layoutOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CONTROL_TOKEN = 'E3KKCDPVQI';

module.exports = {
    transformSource: transformSource
};

function transformSource(source) {
    var attributesMap = {};

    var result = source.replace(/\s+([\w:-]+="[\s\S]*?")/g, function (match, group1) {
        return ' ' + mapAttribute(attributesMap, group1);
    }).replace(/(<[\w-]+)((?:\s+[a-zA-Z0-9-]+)*)(\s*\/?>)/g, function (match, group1, group2, group3) {
        return group1 + fixAttributes(attributesMap, group2) + group3;
    });

    if (result.includes(CONTROL_TOKEN)) {
        throw new Error('flex-directive-replacer: CONTROL_TOKEN "' + CONTROL_TOKEN + '" found in transformation result!');
    }

    return result;
}

function mapAttribute(map, value) {
    var id = generateUniqueId(map);

    map[id] = value;

    return id;
}

function generateUniqueId(map) {
    var id = CONTROL_TOKEN + Math.random().toString(36).slice(2, 12).toUpperCase();

    return map[id] ? generateUniqueId(map) : id;
}

function fixAttributes(map, input) {
    var allAttributes = input.split(/\s+/).filter(Boolean).map(function (id) {
        var _ref = map[id] ? map[id].match(/([\w:-]+)="([\s\S]*?)"/).slice(1) : [id],
            _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        return { key: key, value: value };
    });

    var layoutAttributes = _layoutOptions2.default.map(function (_ref3) {
        var name = _ref3.name,
            values = _ref3.values;

        var layoutAttribute = findAttribute(allAttributes, name);

        if (!layoutAttribute) {
            return null;
        }

        if (values.includes(layoutAttribute.value)) {
            return layoutAttribute;
        }

        return null;
    }).filter(Boolean);

    if (!layoutAttributes.length) {
        return joinAttributes(allAttributes);
    }

    var classAttribute = findAttribute(allAttributes, 'class') || addAttribute(allAttributes, 'class');
    var classesList = new Set(classAttribute.value.split(/\s+/));

    layoutAttributes.forEach(function (attribute) {
        var key = attribute.key,
            value = attribute.value;


        classesList.add(value ? key + '-' + value.replace(/\s+/g, '-') : key);

        removeAttribute(allAttributes, attribute);
    });

    classAttribute.value = [].concat(_toConsumableArray(classesList)).filter(Boolean).join(' ');

    return joinAttributes(allAttributes);
}

function findAttribute(attributes, attributeKey) {
    return attributes.find(function (_ref4) {
        var key = _ref4.key;
        return key === attributeKey;
    });
}

function addAttribute(attributes, attributeKey) {
    var attribute = { key: attributeKey, value: '' };

    attributes.push(attribute);

    return attribute;
}

function removeAttribute(attributes, attribute) {
    if (attributes.includes(attribute)) {
        attributes.splice(attributes.indexOf(attribute), 1);
    }
}

function joinAttributes(attributes) {
    return attributes.map(function (_ref5) {
        var key = _ref5.key,
            value = _ref5.value;

        var attribute = typeof value === 'undefined' ? key : key + '="' + value + '"';

        return ' ' + attribute;
    }).join('');
}