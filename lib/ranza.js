'use strict';

var nodemon = require('nodemon'),
    pJson = require('../package.json'),
    r = require('../core/'),
    watch = require('node-watch'),
    installFlag = false,
    colorizer = r.colorizer;

var Ranza = function() {};
    
Ranza.prototype.default = function() {
    return r.reader('/../docs/default.md')
}

Ranza.prototype.version = function() {
    return ('Ranza version: ' + pJson.version)
}

Ranza.prototype.help = function() {
    return r.reader('/../docs/help.md')
}

Ranza.prototype.watch = function(install) {
    var save = install || false;
    r.sentinel('/').spread(function(files, root){
        var manager = r.manager(files),
            paths = manager['validPaths'];

        console.log('[RANZA WATCHING]'); 
        console.log(colorizer('success', '\nlivereload...\n')); 

        watch(paths, function(filename) {
            var manager = r.manager(files),
                requires = r.cleaner(manager['requires']);

            if (!installFlag){
                installFlag = true;
                r.compare(root, requires, false).spread(function(diffs, dependencies, requires, log) {
                    if (diffs.length <= 0) {
                        installFlag = false;
                        return console.log('Ranza says: There is no unidentified requires!');
                    }

                    return r.installer(root, diffs, save, true).then(function() {
                        installFlag = false;
                    })
                });
            }
        })
    })
}

Ranza.prototype.exec = function() {
    r.sentinel('/').spread(function(files, root){
        var manager = r.manager(files),
            requires = r.cleaner(manager['requires']);

        return r.compare(root, requires)
            .spread(function(diffs, dep, reqs, log) {
                console.log(log + '\n');
            });
            
    }).catch(function(err){
        console.log(colorizer('error', err)); 
    })
}

Ranza.prototype.install = function(install) {
    var save = install || false;
    r.sentinel('/').spread(function(files, root){
        var manager = r.manager(files),
            requires = r.cleaner(manager['requires']);

        return r.installer(root, requires, save, false);

    }).catch(function(err){
        console.log(colorizer('error', 'Ocurred a error: ', err )); 
    })
}

module.exports = new Ranza();
