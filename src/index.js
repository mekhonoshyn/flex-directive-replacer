import path from 'path';
import gulpPlugin from './gulp-plugin';

const webpackLoaderPath = path.join(`${__dirname}, 'webpack-loader'`);

export {
    gulpPlugin,
    webpackLoaderPath
};
