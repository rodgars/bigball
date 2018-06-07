var Team = require('../models/Team');
var Player = require('../models/Player');
const ObjectId = require('mongodb').ObjectID;

module.exports = function(){

	this.get = function(callback){

		Player.find(function(err, players){
			if(err) console.log(err);

			callback(players);

		}).populate('team');
	};

	this.update = function(object, callback) {

		var players = [];

		if(Array.isArray(object)) {players = object} else {players.push(object)}

		var promises = players.map(function(player){
			return new Promise(function(resolve, reject){

				Player.findByIdAndUpdate(player._id, player, {upsert: true, new: true}, function(err, doc){
					if(err) reject(err);
					resolve(doc);
				});
			});
		});

		Promise.all(promises).then(doc => callback(doc)).catch(doc => callback(doc));
	};

	this.delete = function(filter, callback){

		Match.remove(filter, function(err){

			if(err) callback(err);

			callback(true);
		});
		
	};
};
