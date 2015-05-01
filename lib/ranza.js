'use strict';

var pJson = require('../package.json'),
    r = require('../core/'),
    watch = require('node-watch'),
    installFlag = false,
    colorizer = r.colorizer;

var Ranza = function() {};
Ranza.prototype.setDebug = function(debug) {
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
                r.compare(root, requires, false).spread(function(diffs) {
                    if (diffs.length <= 0) {
                        installFlag = false;
                        return console.log(colorizer('message','Ranza says: There is no unidentified requires!\n'));
                    }

                    r.manager('install', root, diffs, save).then(function() {
                        installFlag = false;
                    })
                });
            }
        })
    }).catch(function(err){
       console.log(colorizer('error', 'Ranza: ' + err ));
    })
}

Ranza.prototype.exec = function() {
    var self = this;
    r.sentinel('/').spread(function(files, root){
        var searcher = r.searcher(files),
            requires = r.formater(searcher['requires']);
        return r.compare(root, requires, {debug: self.debug, where: searcher.where})
            .spread(function(diffs, unused, reqs, log) {
                console.log(log + '\n');
            });

    }).catch(function(err){
        console.log(colorizer('error', 'Ranza: ' + err ));
    })
}

Ranza.prototype.install = function(install) {
    var save = install || false;
    r.sentinel('/').spread(function(files, root){
        var searcher = r.searcher(files),
            requires = r.formater(searcher['requires']);

        return r.manager('install', root, requires, save, true);

    }).catch(function(err){
        console.log(colorizer('error', 'Ranza: ' + err )); 
    })
}

Ranza.prototype.clean = function(removeType) {
    var save = removeType || false;
    r.sentinel('/').spread(function(files, root){
        var searcher = r.searcher(files),
            requires = r.formater(searcher['requires']);

        r.compare(root, requires, false).spread(function(diffs, unused) {
            if (unused.length <= 0)
                return console.log(colorizer('message','\nRanza says: There is no unused dependencies!\n'));

            return r.manager('remove', root, unused, save, true);
        })

    }).catch(function(err){
        console.log(colorizer('error', 'Ranza: ' + err ));
    })
}

module.exports = new Ranza();
