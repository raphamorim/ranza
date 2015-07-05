var pJson = require('../package.json'),
    core = require('./core'),
    watch = require('node-watch'),
    installing = false;

function throwError(err) {
    console.log(core.colorizer('error', 'Ranza: ' + err ));
}

var Ranza = new Function();

Ranza.prototype.enableLogs = function(mode) {
    this.logs = (typeof(mode) === 'boolean' ? mode : false);
}

Ranza.prototype.setDebug = function(debug, done, fn) {
    this.debug = (typeof(debug) === 'undefined' ? true : debug);
}

Ranza.prototype.default = function() {
    return core.reader('/../docs/default.md');
}

Ranza.prototype.version = function() {
    return ('Ranza version: ' + pJson.version);
}

Ranza.prototype.help = function() {
    return core.reader('/../docs/help.md');
}

Ranza.prototype.watch = function(install) {
    var save = install || false;
    return core.watcher('/').spread(function(files, root){
        var searcher = core.searcher(files),
            paths = searcher['validPaths'];

        console.log(core.colorizer('success', '\nlivereload...\n'));
        watch(paths, function(filename) {
            var searcher = core.searcher(files),
                requires = core.formater(searcher['requires']);

            if (installing) return;
            installing = true;
            return core.compare(root, requires).spread(function(diffs) {
                if (diffs.length <= 0) {
                    installing = false;
                    return console.log(core.colorizer('message', 'Ranza says: There is no unidentified requires!\n'));
                }

                return core.manager('install', root, diffs, save).then(function() {
                    installing = false;
                });
            });
        });
    }).catch(throwError);
}

Ranza.prototype.status = function(fn) {
    var self = this;
    return core.watcher('/').spread(function(files, root){
        var searcher = core.searcher(files),
            requires = core.formater(searcher['requires']);
        return core.compare(root, requires, {debug: self.debug, where: searcher.where}).spread(function(diffs, unused, reqs, log) {
            if (self.logs) console.log(log + '\n');
            
            var status = {
                undefinedUsed: diffs, 
                definedUnused: unused, 
                definedUsed: reqs
            };
                        
            return ((typeof(fn) === 'function')? fn(status) : status);
        });
    }).catch(throwError);
}

Ranza.prototype.install = function(install) {
    var save = install || false;

    core.asker(function(yes) {
        if (!yes) process.exit();
        return core.watcher('/').spread(function(files, root){
            var searcher = core.searcher(files),
                requires = core.formater(searcher['requires']);

            return core.manager('install', root, requires, save, true);
        }).catch(throwError);
    });
}

Ranza.prototype.clean = function(removeType) {
    var save = removeType || false;
    core.asker(function(yes) {
        if (!yes) process.exit();
        return core.watcher('/').spread(function(files, root){
            var searcher = core.searcher(files),
                requires = core.formater(searcher['requires']);

            return core.compare(root, requires).spread(function(diffs, unused) {
                if (unused.length <= 0) 
                    return console.log(core.colorizer('message', '\nRanza says: There is no unused dependencies!\n'));

                return core.manager('remove', root, unused, save, true);
            });
        }).catch(throwError);
    });
}

module.exports = new Ranza();
