const FLEX_STRING_VALUES = ['none', 'initial', 'auto', 'grow', 'nogrow', 'noshrink', ''];
const ALIGNMENT_MAIN_AXIS = ['start', 'center', 'end', 'stretch', 'space-around', 'space-between'];
const ALIGNMENT_CROSS_AXIS = ['start', 'center', 'end', 'stretch'];
const BREAKPOINTS = ['', 'xs', 'gt-xs', 'sm', 'gt-sm', 'md', 'gt-md', 'lg', 'gt-lg', 'xl', 'print'];
const UNDEFINED_VALUE = undefined;

const BREAKABLE_LAYOUT_OPTIONS_TEMPLATE = [
    {
        name: 'layout',
        values: ['row', 'column']
    },
    {
        name: 'flex',
        values: [
            ...getNumericValues(21, (index) => index * 5),
            ...getNumericValues(2, (index) => (index + 1) * 33),
            ...FLEX_STRING_VALUES,
            UNDEFINED_VALUE
        ]
    },
    {
        name: 'flex-order',
        values: getNumericValues(41, (index) => index - 20)
    },
    {
        name: 'flex-offset',
        values: [
            ...getNumericValues(20, (index) => index * 5),
            ...getNumericValues(2, (index) => (index + 1) * 33)
        ]
    },
    {
        name: 'layout-align',
        values: ALIGNMENT_MAIN_AXIS.reduce((accumulator, mainValue) => [
            ...accumulator,
            ...ALIGNMENT_CROSS_AXIS.map((crossValue) => `${mainValue} ${crossValue}`),
            ...ALIGNMENT_CROSS_AXIS.map((crossValue) => `${mainValue}-${crossValue}`)
        ], [])
    },
    {
        name: 'show',
        values: [UNDEFINED_VALUE]
    },
    {
        name: 'hide',
        values: [UNDEFINED_VALUE]
    },
    {
        name: 'layout-margin',
        values: [UNDEFINED_VALUE]
    },
    {
        name: 'layout-padding',
        values: [UNDEFINED_VALUE]
    }
];

const UNBREAKABLE_LAYOUT_OPTIONS_TEMPLATE = [
    {
        name: 'layout-wrap',
        values: [UNDEFINED_VALUE]
    },
    {
        name: 'layout-nowrap',
        values: [UNDEFINED_VALUE]
    },
    {
        name: 'layout-no-wrap',
        values: [UNDEFINED_VALUE]
    },
    {
        name: 'layout-fill',
        values: [UNDEFINED_VALUE]
    }
];

const LAYOUT_OPTIONS = BREAKABLE_LAYOUT_OPTIONS_TEMPLATE.reduce((accumulator, {name, values}) => [
    ...accumulator,
    ...BREAKPOINTS.map((breakpoint) => ({
        name: [name, breakpoint].filter(Boolean).join('-'),
        values: [...values]
    }))
], [...UNBREAKABLE_LAYOUT_OPTIONS_TEMPLATE]);

export default LAYOUT_OPTIONS;

function getNumericValues(valuesAmount, transformerFn) {
    return new Array(valuesAmount).fill(0).map((value, index) => String(transformerFn(index)));
}
