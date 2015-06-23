function Rooter(path) {
	if (path.indexOf('/') <= 0) return process.cwd();

	var dir = path.split('/');
    return process.cwd() + path.replace(dir[dir.length -1], '');
}

module.exports = Rooter;