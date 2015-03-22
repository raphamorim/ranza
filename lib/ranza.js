var nodemon = require('nodemon'),
    watch   = require('node-watch'),
    glob    = require('glob'),
    core    = require("../core/");

var Ranza = new Object();
    
Ranza.default = function() {
    var data = core.reader('/../docs/default.md');
    console.log(data);
};

Ranza.version = function() {
    console.log('Version: 1.0.0');
};

Ranza.help = function() {
    var data = core.reader('/../docs/help.md');
    console.log(data);
};

Ranza.exec = function(path, install) {
    var projectRoot = core.root(path);

    nodemon({
        script: path,
        ext: '*'
    });

    nodemon.on('start', function () {
        console.log('[Ranza] has started!\n');
        
        watch(projectRoot, function(filename) {
            var options = {}

            glob(projectRoot + '**/*.js*', options, function (er, files) {
                core.manager(files, function(){
                });
            });
        });
    }).on('quit', function () {
        console.log('[Ranza] is quit\n');
    }).on('restart', function (files) {
        console.log('[Ranza] restarted due to changes in: ', files);
    });
}   

module.exports = Ranza;
