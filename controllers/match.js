var Match = require('../models/Match');
var Team = require('../models/Team');

module.exports = function(){

	this.getAll = function(callback){

		Match.find(function(err, matches){
			if(err) console.log(err);

			callback(matches);

		}).populate('homeTeam').populate('visitorTeam');
	};

	this.deleteAll = function(callback){
		Match.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

	this.saveAll = function(matchesJson, callback) {

		Team.loadDictionary(function(teamDictionary){

			

			var matches = matchesJson.map(function(m){
				return new Match({
					_id: m._id,
					group: m.group,
					date: m.date,
					homeTeam: teamDictionary[m.homeTeam],
					visitorTeam: teamDictionary[m.visitorTeam],
				});
			});

			Match.insertMany(matches, function(err, docs){
				if(err) console.log(err);

				callback(docs);
			});

		});
		
	};
};
