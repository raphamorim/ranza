'use strict';

var pJson = require('../package.json'),
    r = require('../core/'),
    watch = require('node-watch'),
    installFlag = false,
    colorizer = r.colorizer;

var Ranza = function() {};

Ranza.prototype.setModuleMode = function(mode) {
    this.moduleMode = (typeof(mode) === 'undefined' ? false : true);
    return ('moduleMode enabled');
}

Ranza.prototype.setDebug = function(debug, done, fn) {
    this.debug = (typeof(debug) === 'undefined' ? true : debug);
    return ('Debug enabled');
}

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
        var searcher = r.searcher(files),
            paths = searcher['validPaths'];

        console.log('[RANZA WATCHING]');
        console.log(colorizer('success', '\nlivereload...\n'));

        watch(paths, function(filename) {
            var searcher = r.searcher(files),
                requires = r.formater(searcher['requires']);

            if (!installFlag){
                installFlag = true;
                r.compare(root, requires).spread(function(diffs) {
                    if (diffs.length <= 0) {
                        installFlag = false;
                        var msg = 'Ranza says: There is no unidentified requires!\n';
                        return console.log(colorizer('message', msg));
                    }

                    r.manager('install', root, diffs, save)
                        .then(function() {
                            installFlag = false;
                    })
                });
            }
        })
    }).catch(function(err){
       console.log(colorizer('error', 'Ranza: ' + err ));
    })
}

Ranza.prototype.exec = function(fn) {
    var self = this;
    r.sentinel('/').spread(function(files, root){
        var searcher = r.searcher(files),
            requires = r.formater(searcher['requires']);
        return r.compare(root, requires, {debug: self.debug, where: searcher.where})
            .spread(function(diffs, unused, reqs, log) {
                if (self.moduleMode) {
                    var status = {
                        undefinedUsed: diffs, 
                        definedUnused: unused, 
                        definedUsed: reqs};
                        
                    if (typeof(fn) === 'function')
                        return fn(status);

                    return status;
                }
                
                console.log(log + '\n');
            });

    }).catch(function(err){
        console.log(colorizer('error', 'Ranza: ' + err ));
    })
}

Ranza.prototype.install = function(install) {
    var save = install || false;

    r.yesno.ask('Are you sure you want to continue? (y/n)', true, function(ok) {
        if(ok) {
            console.log(colorizer('success', 'Ranza: Yes'));
            r.sentinel('/').spread(function(files, root){
                var searcher = r.searcher(files),
                    requires = r.formater(searcher['requires']);

                return r.manager('install', root, requires, save, true);
            }).catch(function(err){
                console.log(colorizer('error', 'Ranza: ' + err ));
            })
        } else {
            process.exit();   
        }
    });
}

Ranza.prototype.clean = function(removeType) {
    var save = removeType || false;
    r.sentinel('/').spread(function(files, root){
        var searcher = r.searcher(files),
            requires = r.formater(searcher['requires']);

        r.compare(root, requires).spread(function(diffs, unused) {
            if (unused.length <= 0) {
                var msg = '\nRanza says: There is no unused dependencies!\n';
                return console.log(colorizer('message', msg));
            }

            return r.manager('remove', root, unused, save, true);
        })

    }).catch(function(err){
        console.log(colorizer('error', 'Ranza: ' + err ));
    })
}

module.exports = new Ranza();
