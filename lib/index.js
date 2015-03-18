var ranza = require('./ranza'),
    verify = require('./cli').verify;

if (verify(['-v', '--version']))
    ranza.version();

else if (verify(['-h', '--help']))
    ranza.help();

else if (process.argv[2].length)
    ranza.exec(process.argv[2], process.argv[3]);

else
    ranza.default();
