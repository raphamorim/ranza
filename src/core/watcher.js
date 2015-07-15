var Promises = require('bluebird'),
	glob = Promises.promisify(require('glob')),
    rooter = require('./rooter');

function Watcher(path) {
    return new Promises(function(resolve, reject) {
        var root = rooter(path),
            globOptions = {};

        glob(root + '/**/*.js', globOptions).then(function(files) {
            return resolve([files, root]);
        });
    });
}

module.exports = Watcher;