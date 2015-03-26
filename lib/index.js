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
	if (process.argv.indexOf('serve') > -1) {
    	return ranza.serve(process.argv[2], process.argv[3]);
	}

	if (process.argv.indexOf('watch') > -1) {
    	return ranza.serve(process.argv[2], process.argv[3]);
	}

	if (process.argv.indexOf('status') > -1) {
    	return ranza.exec('/', null);
	}

   	ranza.exec(process.argv[2], process.argv[3]);
} 

else {
    console.log(ranza.default());
}
