const Guess = require('../models/Guess');
const Ranking = require('../models/Ranking');

module.exports = function(){

	this.get = function(filter, callback){

		Ranking.find().populate('user').then(function(docs){

			docs.sort(function(a, b){return b.total-a.total});

			var result = [];

			result = docs.map(function(doc, index){
				doc = doc.toObject(index);
				doc.position = index + 1;
				return doc;
			});

			callback(result)

		});
	};
};
