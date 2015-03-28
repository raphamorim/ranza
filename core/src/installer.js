'use strict';

var shell = require('child_process'),
    colorizer = require('./colorizer');

function install (path, req, dev) {
  var save = ' --save';
  if (dev) save = ' --save-dev';

  return 'cd ' + path + ' && npm install ' + req + save;
}

function Installer(path, requires, dev) {
   console.log('[RANZA INSTALL]');
   console.log('')
   console.log(colorizer('success','Ranza say: It\'s installing...\n'));

   requires.forEach(function(require) {
      shell.exec(install(path, require, dev), function (error, stdout, stderr) {
        if (error) return console.log(colorizer('error', 'Ocurred a error: ' + error)); 
        if (stdout) console.log(stdout);
        if (stderr) return console.log(colorizer('error', 'Ocurred a error: ' + error)); 
      });
   });
}

module.exports = Installer;