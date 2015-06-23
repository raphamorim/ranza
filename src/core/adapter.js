var fs = require('fs');

exports.gruntDependencies = function(path, dependencies) {
	return fs.readFileSync(path, 'utf8');
}