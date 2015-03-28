'use strict';

var shell = require('child_process');

function Installer(requires, path) {
   var sh = 'cd ' + path + ' && npm install ' + requires;
   console.log(sh);

   console.log('[RANZA INSTALL]');
   console.log('')
   console.time('Execution Time');

   shell.exec(sh, function (error, stdout, stderr) {
        if (error) return console.log('Ocurred a error: ', error); 

        console.log('Say: It\'s installing...');
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);
    });

   console.timeEnd('Execution Time');
}

module.exports = Installer;