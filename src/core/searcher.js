var fs   = require('fs'),
    path = require('path'),
    checker = require('./checker'),
    apiNode = require('../lib/nodeApis');   

function Searcher(paths) {
    var requires = [], parserErrors = [], allPaths = [], requiresPath = {};
    paths.forEach(function(path){
        if (path.indexOf('node_modules/') !== -1) return;
        if (path.indexOf('bower_components/') !== -1) return;
        if (path.indexOf('.min.js') !== -1) return;
        var data = fs.readFileSync(path, 'utf8');
        try {
            var dependencies = checker(data);
        } catch(err) {
            parserErrors.push({path: path, err: err});
            return;
        }

        dependencies.forEach(function(dependency) {
            if (dependency.indexOf('./') !== -1) return;
            if (apiNode.indexOf(dependency) !== -1) return;
            if (dependency.indexOf('/') !== -1)
                dependency = dependency.split('/')[0];

            requires.push(dependency);
            allPaths.push(path);
            requiresPath[dependency] = (requiresPath[dependency] || []);
            requiresPath[dependency].push(path);
        });
    });

    return {
        'requires': requires, 
        'paths': {
            'all': allPaths,
            'require': requiresPath
        },
        'parser': {
            'errors': parserErrors
        }
    };
}

module.exports = Searcher;
