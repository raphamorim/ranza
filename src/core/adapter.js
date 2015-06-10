exports.gruntDependencies = function(path, dependencies) {
	return require('fs').readFileSync(path, 'utf8');
}