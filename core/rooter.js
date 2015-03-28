function Rooter(path) {
	if (path.indexOf('/') > -1) {
		var dir = path.split('/'),
    		root = path.replace(dir[dir.length -1], '');

    	return process.cwd() + root;
	}

	return process.cwd();
}

module.exports = Rooter;