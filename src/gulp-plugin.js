import through2 from 'through2';
import {PluginError} from 'gulp-util';
import {transformSource} from './helper';

export default flexDirectiveReplacerPlugin;

const PLUGIN_NAME = 'gulp-flex-directive-replacer-plugin';

function flexDirectiveReplacerPlugin() {
    return through2.obj(function (fileObject, encoding, callback) {
        if (!fileObject.isBuffer()) {
            return callback(new PluginError(PLUGIN_NAME, 'Non-Buffer content is not supported'));
        }

        try {
            const content = transformSource(fileObject.contents.toString());

            fileObject.contents = Buffer.from(content);

            this.push(fileObject);

            return callback();
        } catch (error) {
            return callback(new PluginError(PLUGIN_NAME, error));
        }
    });
}
