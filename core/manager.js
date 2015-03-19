'use strict';

var fs   = require('fs'),
    path = require('path');

var apiNode = ['path', 'exec', 'fs', 'crypto',
               'os', 'http', 'https', 'net'];

function manager (paths, fn) {
    paths.forEach(function(path){
        if (path.indexOf('node_modules/') === -1) {
            fs.readFile(path, 'utf8', function(err, data) {
                if (err) throw err;
                var dependecies = data.match(/require(\(.*?)\)/g);
                var requires = new Array();

                if (dependecies) {
                    dependecies.forEach(function(dependency){
                        dependency = dependency
                                    .replace("require(", '')
                                    .replace("')", '')
                                    .replace("\")", '')
                                    .replace("\'", '')
                                    .replace("\"", '');

                        if ((dependency.indexOf('/') == -1) && (dependency.indexOf('.js') == -1))
                            if (apiNode.indexOf(dependency) == -1)
                                requires.push(dependency);
                    });
                }

                console.log(requires);
            });
        }
    });
};

module.exports = manager;