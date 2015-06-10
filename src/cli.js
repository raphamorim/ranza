var ranza = require('./ranza'),
    verify = require('./lib/utils').verify,
    commands = process.argv;

if (verify(['-v', '--version']))
    return console.log(ranza.version());

else if (verify(['-h', '--help'])) 
    return console.log(ranza.help());

else if (typeof commands[2] != 'undefined') {
	if (commands.indexOf('status') > -1) {
        if (commands.indexOf('-d') > -1 || commands.indexOf('--debug') > -1)
            ranza.setDebug();
    	return ranza.status();
    }

	if (commands.indexOf('clean') > -1) 
    	return ranza.clean();

	if (commands.indexOf('install') > -1) {
		if (commands.indexOf('--save-dev') > -1)
    		return ranza.install('--save-dev');

    	if (commands.indexOf('--save') > -1)
    		return ranza.install('--save');	

    	return ranza.install();
	}

	if (commands.indexOf('watch') > -1) {
		if (commands.indexOf('--save-dev') > -1)
    		return ranza.watch('--save-dev');

    	if (commands.indexOf('--save') > -1)
    		return ranza.watch('--save');	

    	return ranza.watch();
	}
} 

console.log(ranza.default());