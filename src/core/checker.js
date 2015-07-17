var Promises = require('bluebird'),
    parser = require('./parser'),
    apiNode = require('../lib/nodeApis');

function Checker(data) {
    return new Promises(function(resolve, reject) { 
        var dependencies = null;

        try {
            dependencies = parser(data);
        } catch(err) {
            return resolve([null, err]);
        }

        for (var i = 0; i < dependencies.length; i++) {
            if ((dependencies[i] || '').indexOf('./') !== -1)
                dependencies.splice(i, 1);
            if (apiNode.indexOf((dependencies[i] || '')) !== -1) 
                dependencies.splice(i, 1);
            if ((dependencies[i] || '').indexOf('/') !== -1)
                dependencies[i] = dependencies[i].split('/')[0];
        }

        return resolve([dependencies, null]);
    });
}

module.exports = Checker;