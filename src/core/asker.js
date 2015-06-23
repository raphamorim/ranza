var Promises = require('bluebird'),
    colorizer = require('./colorizer');

var asker = {
    options: {
        yes: ['yes','y'],
        no: ['no','n']
    },

    ask: function (question, defaultvalue, callback, yesvalues, novalues) {
        var self = this;

        if (!self.__invalid) self.resetInvalidHandler();

        yesvalues = yesvalues ? yesvalues : self.options.yes;
        novalues  = novalues  ? novalues : self.options.no;

        yesvalues = yesvalues.map(function(v) { return v.toLowerCase(); });
        novalues  = novalues.map(function(v) { return v.toLowerCase(); });

        process.stdout.write(question+" ");
        process.stdin.setEncoding('utf8');
        process.stdin.once('data', function(val){
            var result;
            var cleaned = val.trim().toLowerCase();

            if (cleaned == "" && defaultvalue != null) {
                result = defaultvalue;
            }
            else if (yesvalues.indexOf(cleaned) >= 0) {
                result = true;
            }
            else if (novalues.indexOf(cleaned) >= 0) {
                result = false;
            }
            else {
                self.__invalid(question,defaultvalue,callback,yesvalues,novalues);
                return;
            }

            callback(result);
        }).resume();
    },

    onInvalidHandler: function(callback) {
        this.__invalid = callback;
    },

    _invalidHandler: function(question, defaultvalue, callback, yesvalues, novalues) {
        process.stdout.write(colorizer('message', "\nInvalid Response.\n"));
        process.stdout.write("Answer either yes : ("+ yesvalues.join(', ')+')');
        process.stdout.write(", or no: ("+ novalues.join(', ')+')\n');
        this.ask(question,defaultvalue,callback,yesvalues,novalues);
    },

    resetInvalidHandler: function() {
        this.onInvalidHandler(this._invalidHandler);
    }
};

var Asker = asker.ask.bind(asker, 'Are you sure you want to continue? (y/n)', true);
module.exports = Asker;
