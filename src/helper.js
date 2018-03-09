import LAYOUT_OPTIONS from './layout-options';

const CONTROL_TOKEN = 'E3KKCDPVQI';

export {transformSource};

function transformSource(source) {
    const attributesMap = {};

    const result = source
        .replace(/\s+([\w:-]+="[\s\S]*?")/g, (match, group1) => ' ' + mapAttribute(attributesMap, group1))
        .replace(/(<[\w-]+)((?:\s+[a-zA-Z0-9-]+)*)(\s*\/?>)/g, (match, group1, group2, group3) => group1 + fixAttributes(attributesMap, group2) + group3);

    if (result.includes(CONTROL_TOKEN)) {
        throw new Error(`flex-directive-replacer: CONTROL_TOKEN "${CONTROL_TOKEN}" found in transformation result!`);
    }

    return result;
}

function mapAttribute(map, value) {
    const id = generateUniqueId(map);

    map[id] = value;

    return id;
}

function generateUniqueId(map) {
    const id = CONTROL_TOKEN + Math.random().toString(36).slice(2, 12).toUpperCase();

    return map[id] ? generateUniqueId(map) : id;
}

function fixAttributes(map, input) {
    const allAttributes = input.split(/\s+/)
        .filter(Boolean)
        .map((id) => {
            const [key, value] = map[id] ? map[id].match(/([\w:-]+)="([\s\S]*?)"/).slice(1) : [id];

            return {key, value};
        });

    const layoutAttributes = LAYOUT_OPTIONS.map(({name, values}) => {
        const layoutAttribute = findAttribute(allAttributes, name);

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

    const classAttribute = findAttribute(allAttributes, 'class') || addAttribute(allAttributes, 'class');
    const classesList = new Set(classAttribute.value.split(/\s+/));

    layoutAttributes.forEach((attribute) => {
        const {key, value} = attribute;

        classesList.add(value ? `${key}-${value.replace(/\s+/g, '-')}` : key);

        removeAttribute(allAttributes, attribute);
    });

    classAttribute.value = [...classesList].filter(Boolean).join(' ');

    return joinAttributes(allAttributes);
}

function findAttribute(attributes, attributeKey) {
    return attributes.find(({key}) => key === attributeKey);
}

function addAttribute(attributes, attributeKey) {
    const attribute = {key: attributeKey, value: ''};

    attributes.push(attribute);

    return attribute;
}

function removeAttribute(attributes, attribute) {
    if (attributes.includes(attribute)) {
        attributes.splice(attributes.indexOf(attribute), 1);
    }
}

function joinAttributes(attributes) {
    return attributes.map(({key, value}) => {
        const attribute = typeof value === 'undefined'
            ? key
            : `${key}="${value}"`;

        return ` ${attribute}`;
    }).join('');
}
