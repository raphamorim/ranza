var ranza = require('./ranza'),
    verify = require('./cli').verify,
    commands = process.argv;

// Version
if (verify(['-v', '--version']))
    return console.log(ranza.version());

// Help
else if (verify(['-h', '--help'])) 
    return console.log(ranza.help());

else if (typeof commands[2] != 'undefined') {

	// Status
	if (commands.indexOf('status') > -1)
    	return ranza.exec();

    // Clean
	if (commands.indexOf('clean') > -1) 
    	return ranza.clean();

    // Install
	if (commands.indexOf('install') > -1) {
		if (commands.indexOf('--save-dev') > -1)
    		return ranza.install('--save-dev');

    	if (commands.indexOf('--save') > -1)
    		return ranza.install('--save');	

    	return ranza.install();
	}

	// Watch
	if (commands.indexOf('watch') > -1) {
		if (commands.indexOf('--save-dev') > -1)
    		return ranza.watch('--save-dev');

    	if (commands.indexOf('--save') > -1)
    		return ranza.watch('--save');	

    	return ranza.watch();
	}
} 

// Default
console.log(ranza.default());