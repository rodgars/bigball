var Team = require('../models/Team');

module.exports = function(){

	this.getAll = function(callback){

		Team.find(function(err, teams){

			if(err) console.log(err);

			callback(teams);

		});
	};

	this.getByName = function(name, callback){

		Team.findByName(name, function(err, team){

			if(err) console.log(err);

			callback(team);

		});
	};


	this.getById = function(id, callback){

		Team.findById(id, function(err, team){
			if(err) console.log(err);

			callback(team);
		});
	};

	this.saveAll = function(teamsJson, callback) {
		console.log(teamsJson);
		var teams = teamsJson.map(function(team){
			return new Team(team);
		});

		Team.insertMany(teams, function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});
	};


	this.save = function(teamJson, callback){

		var team = teamJson;

		if(!team._id) team = new Team(team);

		Team.findByIdAndUpdate(team._id, team, {upsert: true, new: true}, function(err, doc){
			if(err) console.log(err);

			callback(doc);
		});
	};

};
