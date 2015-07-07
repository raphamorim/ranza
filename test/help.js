var assert = require('assert'),
    fs = require('fs'),
    Ranza = require('../index.js');

describe('Help', function() {
	context('help method', function() {
		it('should be equal docs/help.md', function(done) {
			var help = fs.readFileSync(__dirname + '/../docs/help.md', 'utf8');
			var ranzaHelp = Ranza.help();

			assert.deepEqual(ranzaHelp, help)
			done();
		})
	});
});
