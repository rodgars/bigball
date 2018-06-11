var Match = require('../models/Match');
var MatchGuess = require('../models/MatchGuess');

module.exports = function(){

	this.get = function(filter, callback){

		Match.find(filter, function(err, matches){

			if(err) console.log(err);

			callback(matches);

		});
	};

	this.update = function(object, callback, recalculate = false) {

		var matches = [];

		if(Array.isArray(object)) {matches = object} else {matches.push(object)}

		var promises = matches.map(function(t){
			return new Promise(function(resolve, reject){

				Match.findByIdAndUpdate(t._id, t, {upsert: true, new: true}, function(err, doc){
					if(err) reject(err);
					resolve(doc);
				});
			});
		});

		Promise.all(promises).then(function(docs){
			if(recalculate){
				Promise.all(docs.map(function(doc){
					return MatchGuess.calculate(doc);
				})).then(function(){
					callback(docs)
				});
			} else callback(docs);

		}).catch(doc => callback(doc));
	};

	this.delete = function(filter, callback){

		Match.remove(filter, function(err){

			if(err) callback(err);

			callback(true);
		});
		
	};

};
