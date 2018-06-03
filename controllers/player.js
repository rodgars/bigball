var Team = require('../models/Team');
var Player = require('../models/Player');

module.exports = function(){

	this.getAll = function(callback){

		Player.find(function(err, players){
			if(err) console.log(err);

			callback(players);

		}).populate('team');
	};

	this.save = function(playersJson, callback) {	

		if(!Array.isArray(playersJson)) {
			var temp = [];
			temp.push(playersJson);
			playersJson = temp;
		}

		var players = playersJson.map(function(player){
			return new Player(player);
		});

		Player.insertMany(players, function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});
	};

	this.deleteAll = function(callback){
		Player.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};
};
