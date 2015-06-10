var input = process.argv[2];

exports.verify = function(args) {
    if (typeof args === 'object') {
        if (args.indexOf(input) == -1)
            return false;

        return true;
    } else {
        if (args != input)
            return false;
            
        return true;
    }
};
