'use strict';

var Promises = require('bluebird'),
    shell = Promises.promisifyAll(require('child_process')),
    colorizer = require('./colorizer');

function generateCommand(path, dev, command) {
    var save = '';
    if (dev) save = ' ' + dev;

    var sh = 'cd ' + path + ' && npm ' + command + save + ' ';

    return function(req) {
        return sh + req;
    }
}

function generateLog(command, print) {
    if (!print) return false;

    if (command === 'install') {
        console.log('[RANZA INSTALL] \n');
        console.log(colorizer('success', 'Ranza say: It\'s installing...\n'));
    }

    else if (command === 'remove') {
        console.log('[RANZA CLEAN] \n');
        console.log(colorizer('success', 'Ranza say: It\'s removing...\n'));
    }
}

function Execute(path, requires, command, sh) {
    return new Promises(function(resolve, reject) {
        return Promises.map(requires, function(require) {
            console.log(colorizer('message', command + ': ' + require))
            return shell.execAsync(sh(require)).spread(function(stdout) {
                console.log(stdout);
            }).catch(function(err) {
                return console.log(colorizer('error', 'Ocurred a error: ' + err));
            })
        }, {concurrency: 1}).then(function(){
            resolve()
        });
    });
}

function Manager(command, path, requires, dev, print) {
    return new Promises(function(resolve, reject) {
        if (requires.length <= 0)
            return reject('There is no requires to install!');

        if (typeof print === 'undefined') 
            print = false;

        if (command === 'remove') 
            dev = '--save';

        generateLog(command, print);

        return Execute(path, requires, command, generateCommand(path, dev, command))
    });
}

module.exports = Manager;