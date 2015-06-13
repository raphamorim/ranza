var assert = require('assert'),
	Promises = require('bluebird'),
	Ranza = Promises.promisifyAll(require('../index.js')),
	realCwd = process.cwd();

function fakeCwd(path) {
	process.cwd = function() {
		return realCwd + '/test/fixtures/' + path;
	};
}

describe('Status', function() {
	context('apply status command', function() {
		context('on a project without missed requires and undefined dependencies', function() {
			it('should return only the used dependencies', function(done) {
				fakeCwd('perfectProject');
				Ranza.setModuleMode(true)

				Ranza.status(function(status) {
					assert.deepEqual(typeof(status), 'object');
					assert.deepEqual(status.undefinedUsed, []);
					assert.deepEqual(status.definedUnused, []);
					assert.deepEqual(status.definedUsed, ['bluebird', 'glob']);
					done();
				})
			})
		})
	});
});
