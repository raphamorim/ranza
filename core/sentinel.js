var	watch   = require('node-watch'),
    glob    = require('glob'),
    _		= require('./');

function Sentinel(path, config, fn) {
	var root = _.root(path),
		globOptions = {};

	if (config.watch) {
		watch(root, function(filename) {
        	glob(root + '**/*.js*', globOptions, function (er, files) {
            	return fn(files, root);
        	});
    	});

    } else if (!config.watch) {
    	glob(root + '**/*.js*', globOptions, function (er, files) {
            return fn(files, root);
        });

    } else {
    	return false;

    }
} 

module.exports = Sentinel;