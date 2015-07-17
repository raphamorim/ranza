var pJson = require('../package.json'),
    core = require('./core'),
    installing = false;

function throwError(err) {
    throw Error(err);
    console.log(core.colorizer('error', 'Ranza: ' + err ));
}

var Ranza = new Function();

Ranza.prototype.enableLogs = function(mode) {
    this.logs = (typeof(mode) === 'boolean' ? mode : false);
};

Ranza.prototype.setDebug = function(debug, done, fn) {
    this.debug = (typeof(debug) === 'undefined' ? true : debug);
};

Ranza.prototype.default = function() {
    return ('Hey young padawan, please type a valid command.\n' +
        '>> To see all commands, use: ranza [ -h, --help ]');
};

Ranza.prototype.version = function() {
    return ('Ranza version: ' + pJson.version);
};

Ranza.prototype.help = function() {
    return core.reader('/../docs/help.md');
};

Ranza.prototype.status = function(fn) {
    var self = this;
    return core.watcher('/').spread(function(files, root){
        var searcher = core.searcher(files),
            requires = core.formater(searcher['requires']);
        var debugOptions = {debug: self.debug, where: searcher.paths.require};
        return core.compare(root, requires, debugOptions)
            .spread(function(diffs, unused, reqs, log) {
                if (self.logs) {
                    if (searcher.parser.errors.length)
                        console.log('Parser Errors: ', searcher.parser.errors);
                    console.log(log + '\n');
                }
                var status = {
                    undefinedUsed: diffs,
                    definedUnused: unused,
                    definedUsed: reqs
                };

                return ((typeof(fn) === 'function')? fn(status) : status);
            });
    }).catch(throwError);
};

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
};

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
};

Ranza.prototype.check = function(fileSrc, fn) {
    var fileData = require('fs').readFileSync(fileSrc, 'utf8');
    return core.checker(fileData).spread(function(dependencies, err) {
        return fn(dependencies, err);
    });
}

module.exports = new Ranza();
