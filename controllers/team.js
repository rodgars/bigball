var Team = require('../models/Team');
const ObjectId = require('mongodb').ObjectID;

module.exports = function(){

	this.get = function(filter, callback){

		Team.find(filter, function(err, teams){

			if(err) callback(err);

			callback(teams);

		});
	};

	this.update = function(object, callback) {

		var teams = [];

		if(Array.isArray(object)) {teams = object} else {teams.push(object)}

		var promises = teams.map(function(team){
			return new Promise(function(resolve, reject){

				Team.findByIdAndUpdate(team._id, team, {upsert: true, new: true}, function(err, doc){

					if(err) reject(err);
					resolve(doc);
				});
			});
		});

		Promise.all(promises).then(doc => callback(doc)).catch(doc => callback(doc));
	};

	this.delete = function(filter, callback){

		Team.remove(filter, function(err){

			if(err) callback(err);

			callback(true);
		});
		
	};

};
