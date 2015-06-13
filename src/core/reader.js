var fs = require('fs');

function Reader (filename) {
    return fs.readFileSync(__dirname + '/../' + filename, 'utf8');
};

module.exports = Reader;