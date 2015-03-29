'use strict';

var Promises = require('bluebird'), 
	colorizer = require('./colorizer');

function diff (arr, diff){
    return arr.filter(function(i) {return diff.indexOf(i) < 0;});
}

function Compare (root, requires) {
	return new Promises(function(resolve, reject) {
		var pJson = require(root + '/package.json');
		var log = [];

		var dependencies = new Array(),
			normal = pJson.dependencies || {},
			dev = pJson.devDependencies || {};

		if (requires.length <= 0 && dependencies.length <= 0) {
			reject({'error': 'Ranza say: There is no dependencies or requires!'});
		}

		normal = (Object.keys(normal));
		dev = (Object.keys(dev));

		dependencies = normal.concat(dev);

		dependencies = dependencies.filter(function(item, pos) {
    		return dependencies.indexOf(item) == pos;
		});

		log.push('[RANZA STATUS]\n');

		dependencies.forEach(function(dependency) {
			var index = requires.indexOf(dependency);
			if (index < 0) {
				log.push(colorizer('error','[FAIL]') + ' <' + dependency + '> is defined but is not being used')
			} else {
				log.push(colorizer('success','[OK]') + ' <' + dependency + '> is defined and used')
			}
		});

		var differences = diff(requires, dependencies);
		if (differences.length > 0) {
			differences.forEach(function(diff) {
				log.push(colorizer('error','[FAIL]') + ' <' + diff + '> is being used, without define')
			})

			log.push('\nTip: To install undefined requires run:')
			log.push('\n $ ranza install --save')
		}

		resolve([differences, dependencies, requires, log.join('\n')]);
	});
}

module.exports = Compare;