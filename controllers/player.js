var Team = require('../models/Team');
var Player = require('../models/Player');

module.exports = function(){

	this.getAll = function(callback){

		Player.find(function(err, players){
			if(err) console.log(err);

			callback(players);

		}).populate('team');
	};

	this.deleteAll = function(callback){

		Player.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
	};

	this.saveAll = function(playersJson, callback) {

		Team.loadDictionary(function(teamDictionary){			

			var players = playersJson.map(function(p){
				return new Player({
					name: p.name,
					team: teamDictionary[p.team]
				});
			});

			Player.insertMany(players, function(err, docs){
				if(err) console.log(err);

				callback(docs);
			});

		});
		
	};
};
