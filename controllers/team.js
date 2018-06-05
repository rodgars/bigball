var Team = require('../models/Team');

module.exports = function(){

	this.getAll = function(callback){

		Team.find(function(err, teams){

			if(err) console.log(err);

			callback(teams);

		});
	};

	this.save = function(teamsJson, callback) {	

		if(!Array.isArray(teamsJson)) {
			var temp = [];
			temp.push(teamsJson);
			teamsJson = temp;
		}

		var teams = teamsJson.map(function(team){
			return new Team(team);
		});

		Team.insertMany(teams, function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});
	};

	this.deleteAll = function(callback){
		Team.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

};
