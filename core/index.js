exports.reader   = require('./reader');
exports.manager  = require('./manager');

exports.root = function (path) {
	if (path.indexOf('/') > -1) {
		var dir = path.split('/'),
        	root = path.replace(dir[dir.length -1], '');

        return root;
    }

    return '/';
}