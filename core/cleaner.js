'use strict';

function Cleaner(arr) {
  var newArr = [];
  if (typeof arr === 'object') {
  	arr.forEach(function(item, index) {
  		if (/^[A-Za-z0-9\s_-]+$/.test(item))
  			newArr.push(item);
  	});

  	return newArr;
  }
}

module.exports = Cleaner;