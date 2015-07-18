var fs = require('fs');

exports.gruntfileData = function(path) {
	return fs.readFileSync(path, 'utf8');
}