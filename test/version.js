var assert = require('assert'),
	Ranza = require('../index.js');

describe('Version', function() {
	context('version method', function() {
		it('should be equal package.json version', function(done) {
			var packageVersion = require('../package.json').version,
				ranzaVersion = Ranza.version();

			assert.deepEqual(ranzaVersion, 'Ranza version: ' + packageVersion);
			done();
		})
	});
});
