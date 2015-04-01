'use strict';

var Promises = require('bluebird'), 
	colorizer = require('./colorizer');

function diff (arr, diff){
    return arr.filter(function(i) {return diff.indexOf(i) < 0;});
}

function Compare (root, requires) {
	return new Promises(function(resolve, reject) {
		var pJson = require(root + '/package.json');
		var log = [],
			successLog = [],
			unusedLog = [],
			undefinedLog = [];

		var dependencies = new Array(),
			normal = pJson.dependencies || {},
			dev = pJson.devDependencies || {};

		if (requires.length <= 0 && dependencies.length <= 0) {
			return reject('There is no dependencies or requires!');
		}

		normal = (Object.keys(normal));
		dev = (Object.keys(dev));

		dependencies = normal.concat(dev);

		dependencies = dependencies.filter(function(item, pos) {
    		return dependencies.indexOf(item) == pos;
		});

		log.push('[RANZA STATUS]');

		dependencies.forEach(function(dependency) {
			var index = requires.indexOf(dependency);
			if (index < 0) {
				unusedLog.push(colorizer('error', '  • ') + dependency)
			} else {
				successLog.push(colorizer('success', '  • ') + dependency)
			}
		});

		var unused = diff(dependencies, requires);

		var differences = diff(requires, dependencies);
		if (differences.length > 0) {
			differences.forEach(function(diff) {
				undefinedLog.push(colorizer('error', '  • ') + diff)
			})
		}

		if (successLog.length > 0) {
			log.push(colorizer('success','\n Defined and used:'))
			log.push(successLog.join('\n'))
		}

		if (unusedLog.length > 0) {
			log.push(colorizer('error','\n Defined, but unused:'))
			log.push(unusedLog.join('\n'))
		}

		if (undefinedLog.length > 0) {
			log.push(colorizer('error','\n Undefined, but used:'))
			log.push(undefinedLog.join('\n'))	
		}

		resolve([differences, unused, dependencies, log.join('\n')]);
	});
}

module.exports = Compare;