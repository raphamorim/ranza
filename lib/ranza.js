var nodemon = require('nodemon'),
    _ = require('../core/');

var Ranza = function() {};
    
Ranza.prototype.default = function() {
    console.log(_.reader('/../docs/default.md'))
}

Ranza.prototype.version = function() {
    console.log('Version: 1.0.0')
}

Ranza.prototype.help = function() {
    console.log(_.reader('/../docs/help.md'))
}

Ranza.prototype.watch = function(path, install) {
    _.sentinel(path, {watch: true},function(files){
        console.log(_.manager(files));
    })
}

Ranza.prototype.exec = function(path, install) {
    _.sentinel(path, {watch: false}, function(files, root){
        var requires = _.manager(files);
        _.compare(root, requires);
    })
}

Ranza.prototype.serve = function(path, install) {
    var self = this;

    nodemon({
        script: path,
        ext: '*'
    });

    nodemon.on('start', function () {
        console.log('[Ranza] has started!\n');
        
        self.watch(path, install);

    }).on('quit', function () {
        console.log('[Ranza] is quit\n');
    }).on('restart', function (files) {
        console.log('[Ranza] restarted due to changes in: ', files);
    });
}

module.exports = new Ranza();
