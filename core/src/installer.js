'use strict';

var Promises = require('bluebird'),
    shell = Promises.promisifyAll(require('child_process')),
    colorizer = require('./colorizer');

function install(path, req, dev) {
    var save = '';
    if (dev) save = ' ' + dev;

    return 'cd ' + path + ' && npm install ' + req + save;
}

function Installer(path, requires, dev, notPrint) {
    return new Promises(function(resolve, reject) {
        if (!notPrint) {
            console.log('[RANZA INSTALL]');
            console.log('')
            console.log(colorizer('success', 'Ranza say: It\'s installing...\n'));
        }

        return Promises.map(requires, function(require) {
            console.log(colorizer('message', 'Installing: ' + require))
            return shell.execAsync(install(path, require, dev)).spread(function(stdout) {
                console.log(stdout);
            }).catch(function(err) {
                return console.log(colorizer('error', 'Ocurred a error: ' + err));
            })
        }, {concurrency: 1}).then(function(){
            resolve()
        });
    });
}

module.exports = Installer;