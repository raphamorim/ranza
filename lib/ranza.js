var shell = require('child_process'),
    fs = require('fs'),
    utils = require('../utils'),
    readFile = utils.readFile;

var Ranza = new Object();
    
Ranza.default = function() {
    readFile('/../docs/default.md');
};

Ranza.version = function() {
    console.log('Version: 1.0.0');
};

Ranza.help = function() {
    readFile('/../docs/help.md');
};

Ranza.exec = function(path, install) {
    // if (typeof install === 'undefined')

    fs.readFile(path, 'utf8', function(err, data) {
        if (err) throw err;
        var dependecies = data.match(/require(\(.*?)\)/g);
        var requires = new Array();

        dependecies.forEach(function(dependency){
            dependency = dependency.replace("require('", '');
            dependency = dependency.replace("')", '');

            requires.push(dependency);
        });

        console.log(requires);
    });
}   

module.exports = Ranza;
