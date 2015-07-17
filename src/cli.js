var ranza = require('./ranza'),
    verify = require('./lib/utils').verify,
    commands = process.argv;

ranza.enableLogs(true);

if (verify(['-v', '--version']))
    console.log(ranza.version());

else if (verify(['-h', '--help']))
    console.log(ranza.help());

else if (typeof commands[2] != 'undefined') {
	if (commands.indexOf('status') > -1) {
        if (commands.indexOf('-d') > -1 || commands.indexOf('--debug') > -1)
            ranza.setDebug();
    	ranza.status();
    }

	else if (commands.indexOf('clean') > -1) {
    	ranza.clean();
    }

	else if (commands.indexOf('install') > -1) {
		if (commands.indexOf('--save-dev') > -1)
    		ranza.install('--save-dev');

    	else if (commands.indexOf('--save') > -1)
    		ranza.install('--save');

    	else 
            ranza.install();
	}

    else {
        console.log(ranza.default());
    }
}

else {
    console.log(ranza.default());
}
