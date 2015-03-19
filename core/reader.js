var fs = require('fs');

function readFile (filename) {
    fs.readFile(__dirname + filename, 'utf8', function(err, data) {
        if (err) throw err;
        return data;
    });
};

module.exports = readFile;