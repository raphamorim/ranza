var fs   = require('fs'),
    path = require('path'),
    checker = require('./checker'),
    apiNode = require('../lib/nodeApis');   

function Searcher(paths) {
    var requires = [], validPaths = [], where = {};
    paths.forEach(function(path){
        if (path.indexOf('node_modules/') !== -1) return;
        var data = fs.readFileSync(path, 'utf8');
        var dependencies = checker(data);
        
        dependencies.forEach(function(dependency) {
            if (dependency.indexOf('/') !== -1) return;
            if (apiNode.indexOf(dependency) !== -1) return;

            requires.push(dependency);
            validPaths.push(path);
            where[dependency] = (where[dependency] || []);
            where[dependency].push(path);
        });
    });

    return {
        'requires': requires, 
        'validPaths': validPaths, 
        'where': where
    };
}

module.exports = Searcher;
