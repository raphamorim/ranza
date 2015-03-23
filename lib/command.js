var Command = function () {};

Command.prototype.contains = function(items, fn){
	var self = this,
		commands = process.argv;

	if (typeof commands == 'undefined') {
		return false;
	}

	console.log(fn);

    if (typeof items === 'object') {
        items.forEach(function(item) {
        	if (commands.indexOf(item) > -1)
        		return fn;
        });
        
        return false;

    } else if (typeof items === 'string') {
        var item = items;
        if (item === commands[2])
        	self.fn();
        
        return false;
    }
}

module.exports = new Command();