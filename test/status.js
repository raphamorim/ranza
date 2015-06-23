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
			it('should return only the used dependencies and a empty unused/undefined list', function(done) {
				fakeCwd('perfectDependencies');
				Ranza.setModuleMode(true)

				Ranza.status(function(status) {
					assert.deepEqual(typeof(status), 'object');
					assert.deepEqual(status.undefinedUsed, []);
					assert.deepEqual(status.definedUnused, []);
					assert.deepEqual(status.definedUsed, ['bluebird', 'glob']);
					done();
				});
			})
		})
		context('on a project with unused dependencies', function() {
			it('should return the unused dependencies', function(done) {
				fakeCwd('unusedDependecy');
				Ranza.setModuleMode(true)

				Ranza.status(function(status) {
					assert.deepEqual(typeof(status), 'object');
					assert.deepEqual(status.undefinedUsed, []);
					assert.deepEqual(status.definedUnused, ['kenobi', 'glob']);
					assert.deepEqual(status.definedUsed, ['bluebird']);
					done();
				});
			})
		})
	});
});
