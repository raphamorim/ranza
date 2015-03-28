var colorizer = require('./colorizer');

function diff (arr, diff){
    return arr.filter(function(i) {return diff.indexOf(i) < 0;});
}

function Compare (root, requires) {
	var pJson = require(root + '/package.json');

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
			console.log(colorizer('error','[FAIL]') + ' <' + dependency + '> is defined but is not being used')
		} else {
			console.log(colorizer('success','[OK]') + ' <' + dependency + '> is defined and used')
		}
	});

	var differences = diff(requires, dependencies);
	if (differences.length > 0) {
		differences.forEach(function(diff) {
			console.log(colorizer('error','[FAIL]') + ' <' + diff + '> is being used, without define')
		})

		console.log('\n', 'Tip: To install undefined requires run:', '\n')
		console.log(' $ ranza install')
	}

	console.log('');
}

module.exports = Compare;