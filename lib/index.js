var ranza = require('./ranza'),
    verify = require('./cli').verify;

// TODO: Finish H as this command line lib

if (verify(['-v', '--version'])) {
    console.log(ranza.version());
}

else if (verify(['-h', '--help'])) {
    console.log(ranza.help());
} 

else if (typeof process.argv[2] != 'undefined') {

	if (process.argv.indexOf('watch') > -1 && process.argv.indexOf('--save-dev') > -1) {
    	return ranza.watch('--save-dev');
	}

	if (process.argv.indexOf('watch') > -1 && process.argv.indexOf('--save') > -1) {
    	return ranza.watch('--save');
	}

	if (process.argv.indexOf('watch') > -1) {
    	return ranza.watch(process.argv[2], process.argv[3]);
	}

	if (process.argv.indexOf('status') > -1) {
    	return ranza.exec();
	}

	if (process.argv.indexOf('clean') > -1) {
    	return ranza.clean();
	}

	if (process.argv.indexOf('install') > -1 && process.argv.indexOf('--save-dev') > -1) {
    	return ranza.install('--save-dev');
	}

	if (process.argv.indexOf('install') > -1 && process.argv.indexOf('--save') > -1) {
    	return ranza.install('--save');
	}

	if (process.argv.indexOf('install') > -1) {
    	return ranza.install();
	}

	console.log(ranza.default());
} 

else {
    console.log(ranza.default());
}
