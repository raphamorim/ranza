'use strict';

var fs   = require('fs'),
    path = require('path'),
    config = require('../config');
    
var apiNode = config.apiNode;

function Manager (paths) {
    return search(paths);
};

function search (paths) {
    var requires = new Array();
    var validPaths = new Array();

    paths.forEach(function(path){
        if (path.indexOf('node_modules/') === -1) {
            var data = fs.readFileSync(path, 'utf8');
            var dependecies = data.match(/require(\(.*?)\)/g);

            if (dependecies) {
                dependecies.forEach(function(dependency){
                dependency = dependency
                                .replace("require(", '')
                                .replace("')", '')
                                .replace("\")", '')
                                .replace("\'", '')
                                .replace("\"", '');

                    if ((dependency.indexOf('/') == -1) && (dependency.indexOf('.js') == -1)) {                        if (apiNode.indexOf(dependency) == -1) {
                            requires.push(dependency);
                            validPaths.push(path);
                        }
                    }
                });
            }
        }
    });

    return {'requires': requires, 'validPaths': validPaths};
}

module.exports = Manager;