exports.sentinel  = require('./sentinel');
exports.manager   = require('./manager');
exports.reader    = require('./reader');

exports.root = function (path) {
	if (path.indexOf('/') > -1) {
		var dir = path.split('/'),
        	root = path.replace(dir[dir.length -1], '');

        return root;
    }

    return '/';
};

exports.compare = function (root, requires) {
	var pJson = require('.' + root + 'package.json');

	var dependencies = new Array(),
		normal = pJson.dependencies || {},
		dev = pJson.devDependencies || {};

	normal = (Object.keys(normal));
	dev = (Object.keys(dev));

	dependencies = normal.concat(dev);

	console.log('\n[RANZA STATUS]\n');

	dependencies.forEach(function(dependency) {
		var index = requires.indexOf(dependency);
		if (index < 0) {
			console.log('[FAIL] <' + dependency + '> is defined but is not being used')
		} else {
			console.log('[OK] <' + dependency + '> is defined and used')
		}
	});

	console.log('');
};