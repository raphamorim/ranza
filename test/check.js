var assert = require('assert'),
    Promises = require('bluebird'),
    Ranza = Promises.promisifyAll(require('../index.js'));

describe('Check', function() {
    context('require [node native]', function() {
        context('simple require without node apis', function() {
            it('should return dependency list and err equals null', function(done) {
                var fileName = __dirname + '/fixtures/node.simpleRequest.md';
                Ranza.check(fileName, function(dependencies, err) {
                    assert.deepEqual(typeof dependencies, 'object');
                    assert.deepEqual(err, null);

                    assert.deepEqual(dependencies, ['kenobi', 'bluebird', 'ranza']);
                    done();
                });
            })
        })
        context('simple require with node apis', function() {
            it('should return dependency list without node apis and err equals null', function(done) {
                var fileName = __dirname + '/fixtures/node.simpleRequestWithNodeApis.md';
                Ranza.check(fileName, function(dependencies, err) {
                    assert.deepEqual(typeof dependencies, 'object');
                    assert.deepEqual(err, null);

                    assert.deepEqual(dependencies, ['kenobi', 'bluebird', 'ranza']);
                    done();
                });
            })
        })
        context('simple require with module definition without node apis', function() {
            it('should return dependency list and err equals null', function(done) {
                var fileName = __dirname + '/fixtures/node.simpleRequestWithModuleDefinition.md';
                Ranza.check(fileName, function(dependencies, err) {
                    assert.deepEqual(typeof dependencies, 'object');
                    assert.deepEqual(err, null);

                    assert.deepEqual(dependencies, ['mandrill-api', 'ranza']);
                    done();
                });
            })
        })
    })
    context('import [iojs ES6]', function() {
        context('simple import without node apis', function() {
            it('should return dependency list and err equals null', function(done) {
                var fileName = __dirname + '/fixtures/iojs.simpleRequest.md';
                Ranza.check(fileName, function(dependencies, err) {
                    assert.deepEqual(typeof dependencies, 'object');
                    assert.deepEqual(err, null);

                    assert.deepEqual(dependencies, ['kenobi', 'ranza', 'bluebird']);
                    done();
                });
            })
        })
        context('wrong import without node apis', function() {
            it('should return dependency list and err equals null', function(done) {
                var fileName = __dirname + '/fixtures/iojs.wrongRequest.md';
                Ranza.check(fileName, function(dependencies, err) {
                    assert.deepEqual(dependencies, null);
                    assert.deepEqual(typeof err, 'object');
                    done();
                });
            })
        })
    })
});
