var Match = require('../models/Match');
var Stage = require('../models/Stage');

module.exports = function(){

	this.getAll = function(callback){

		Stage.find(function(err, stages){
			if(err) console.log(err);

			callback(stages);

		}).populate(
			{path: 'matches', populate: { path: 'homeTeam' }}
		).populate(
			{path: 'matches', populate: { path: 'visitorTeam' }}
		);
	};

	this.deleteAll = function(callback){
		Stage.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

	this.saveAll = function(stagesJson, callback) {

		Match.loadDictionary(function(matchDictionary){
			
			var stages = stagesJson.map(function(s){

				var newStage = Stage({
					_id: s._id,
					deadline: s.deadline
				});

				for(var index in s.matches){
					var m = matchDictionary[s.matches[index]];
					newStage.matches.push(m);
				}

				return newStage;
			});

			Stage.insertMany(stages, function(err, docs){
				if(err) console.log(err);

				callback(docs);
			});
		});
		
	};
};
