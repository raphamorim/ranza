var assert = require('assert'),
	Ranza = require('../index.js');

describe('Help', function() {
	context('help method', function() {
		it('should be equal docs/help.md', function(done) {
			var help = require('fs')
					.readFileSync(__dirname + '/../docs/help.md', 'utf8');
				
			var ranzaHelp = Ranza.help();

			assert.deepEqual(ranzaHelp, help);
			done();
		})
	});
});
