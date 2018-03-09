import {transformSource} from './helper';

const IS_RAW = true;

export {
    flexDirectiveReplacerLoader as default,
    IS_RAW as raw
};

function flexDirectiveReplacerLoader(source) {
    this.cacheable();

    return transformSource(source.toString());
}
