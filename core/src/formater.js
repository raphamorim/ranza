'use strict';

function Formater(arr) {
  var newArr = [];
  if (typeof arr === 'object') {
  	arr.forEach(function(item, index) {
  		if (/^[A-Za-z0-9\s_-]+$/.test(item))
  			newArr.push(item);
  	});

  	return newArr.filter(function(item, pos) {
    	return newArr.indexOf(item) == pos;
	});
  }
}

module.exports = Formater;