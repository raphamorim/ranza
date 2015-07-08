var fs   = require('fs'),
    path = require('path'),
    apiNode = require('../lib/nodeApis');

function Searcher (paths) {
    return search(paths);
};

function search (paths) {
    var requires = [],
        validPaths = [],
        where = {};

    paths.forEach(function(path){
        if (path.indexOf('node_modules/') !== -1) return;
        var data = fs.readFileSync(path, 'utf8');
        var dependecies = data.match(/require(\(.*?)\)/g);

        if (!dependecies) return;
        dependecies.forEach(function(dependency){
            dependency = dependency
                .replace("require(", '')
                .replace("')", '')
                .replace("\")", '')
                .replace("\'", '')
                .replace("\"", '');

            if (dependency.indexOf('/') !== -1) return;
            if (dependency.indexOf('.js') !== -1) return;
            if (apiNode.indexOf(dependency) !== -1) return;

            requires.push(dependency);
            validPaths.push(path);
            where[dependency] = (where[dependency] || []);
            where[dependency].push(path);
        });
    });

    return {'requires': requires, 'validPaths': validPaths, 'where': where};
}

module.exports = Searcher;
