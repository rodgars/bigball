const Guess = require('../models/Guess');
const Ranking = require('../models/Ranking');

module.exports = function(){

	this.get = function(filter, callback){

		Ranking.find(filter).populate('user').then(function(docs){

			docs.sort(function(a, b){return b.total-a.total});

			docs = docs.map(function(doc){return doc.toObject();});

			
			var pos = 1;
			var maxPoints = docs[0].total;
			docs.forEach(function(item, index){

				if(maxPoints > item.total) {
					item.position = ++pos;
					maxPoints = item.total;
				} else {
					item.position = pos;
				}
			});

			callback(docs);
		});
	};
};
