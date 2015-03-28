'use strict';

var Core = {
	'sentinel': require('./src/sentinel'),

	'manager': require('./src/manager'),

	'installer': require('./src/installer'),

	'cleaner': require('./src/cleaner'),

	'reader': require('./src/reader'),

	'root': require('./src/rooter'),

	'compare': require('./src/comparer'),

	'colorizer': require('./src/colorizer')
};

module.exports = Core;
