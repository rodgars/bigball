var Match = require('../models/Match');
var Team = require('../models/Team');

module.exports = function(){

	this.saveAll = function(matchesJson, callback) {

		Team.find(function(err, teams){

			var teamDictionary = {};

			for(var index in teams){
				teamDictionary[teams[index].name] = teams[index];
			}

			var matches = matchesJson.map(function(m){
				return new Match({
					number: m.number,
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
