var Match = require('../models/Match');

module.exports = function(){

	this.getAll = function(callback){

		Match.find(function(err, matches){

			if(err) console.log(err);

			callback(matches);

		});
	};

	this.save = function(matchesJson, callback) {	

		if(!Array.isArray(matchesJson)) {
			var temp = [];
			temp.push(matchesJson);
			matchesJson = temp;
		}

		var matchs = matchesJson.map(function(match){
			return new Match(match);
		});

		Match.insertMany(matchs, function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});
	};

	this.deleteAll = function(callback){
		Match.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

};
