var fs = require('fs');

function readFile (filename) {
    return fs.readFileSync(__dirname + filename, 'utf8');
};

module.exports = readFile;