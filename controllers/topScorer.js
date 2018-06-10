const ObjectId = require('mongodb').ObjectID;
var TopScorer = require('../models/TopScorer');

module.exports = function(){

	this.get = function(filter, callback){
		
		TopScorer.find(filter, function(err, scorers){
			if(err) callback(err);
			callback(scorers);

		});

	};

	this.save = function(object, callback) {

		var topScorers = [];

		if(Array.isArray(object)) {topScorers = object} else {topScorers.push(object)}

		var promises = topScorers.map(function(topScorer){
			return TopScorer.asyncUpsert(topScorer._id, topScorer);
		});

		Promise.all(promises).then(doc => callback(doc)).catch(err => callback(err));
	};

	this.delete = function(filter, callback){
		TopScorer.deleteMany(filter, function(err){
			if(err) console.log(err);

			callback(true);
		});
	};
};
