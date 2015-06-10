'use strict';

var pJson = require('../package.json'),
    core = require('../core/'),
    watch = require('node-watch'),
    installFlag = false;

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
    return core.reader('/../docs/default.md')
}

Ranza.prototype.version = function() {
    return ('Ranza version: ' + pJson.version)
}

Ranza.prototype.help = function() {
    return core.reader('/../docs/help.md')
}

Ranza.prototype.watch = function(install) {
    var save = install || false;
    core.sentinel('/').spread(function(files, root){
        var searcher = core.searcher(files),
            paths = searcher['validPaths'];

        console.log('[RANZA WATCHING]');
        console.log(core.colorizer('success', '\nlivereload...\n'));

        watch(paths, function(filename) {
            var searcher = core.searcher(files),
                requires = core.formater(searcher['requires']);

            if (!installFlag){
                installFlag = true;
                core.compare(root, requires).spread(function(diffs) {
                    if (diffs.length <= 0) {
                        installFlag = false;
                        var msg = 'Ranza says: There is no unidentified requires!\n';
                        return console.log(core.colorizer('message', msg));
                    }

                    core.manager('install', root, diffs, save)
                        .then(function() {
                            installFlag = false;
                    })
                });
            }
        })
    }).catch(function(err){
       console.log(core.colorizer('error', 'Ranza: ' + err ));
    })
}

Ranza.prototype.status = function(fn) {
    var self = this;
    return core.sentinel('/').spread(function(files, root){
        var searcher = core.searcher(files),
            requires = core.formater(searcher['requires']);
        return core.compare(root, requires, {debug: self.debug, where: searchecore.where}).spread(function(diffs, unused, reqs, log) {
            if (self.moduleMode) {
                var status = {
                    undefinedUsed: diffs, 
                    definedUnused: unused, 
                    definedUsed: reqs
                };
                        
                if (typeof(fn) === 'function')
                    return fn(status);

                return status;
            }
                
            console.log(log + '\n');
        });
    }).catch(function(err){
        console.log(core.colorizer('error', 'Ranza: ' + err ));
    })
}

Ranza.prototype.install = function(install) {
    var save = install || false;

    core.yesno.ask('Are you sure you want to continue? (y/n)', true, function(ok) {
        if(ok) {
            console.log(core.colorizer('success', 'Ranza: Yes'));
            core.sentinel('/').spread(function(files, root){
                var searcher = core.searcher(files),
                    requires = core.formater(searcher['requires']);

                return core.manager('install', root, requires, save, true);
            }).catch(function(err){
                console.log(core.colorizer('error', 'Ranza: ' + err ));
            })
        } else {
            process.exit();   
        }
    });
}

Ranza.prototype.clean = function(removeType) {
    var save = removeType || false;
    core.sentinel('/').spread(function(files, root){
        var searcher = core.searcher(files),
            requires = core.formater(searcher['requires']);

        core.compare(root, requires).spread(function(diffs, unused) {
            if (unused.length <= 0) {
                var msg = '\nRanza says: There is no unused dependencies!\n';
                return console.log(core.colorizer('message', msg));
            }

            return core.manager('remove', root, unused, save, true);
        })

    }).catch(function(err){
        console.log(core.colorizer('error', 'Ranza: ' + err ));
    })
}

module.exports = new Ranza();
