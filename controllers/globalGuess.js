const ObjectId = require('mongodb').ObjectID;
var GlobalGuess = require('../models/GlobalGuess');
var emptyGlobalGuesses = require('../misc/GlobalGuess.json');

module.exports = function(){

	this.get = function(filter, callback){
		
		GlobalGuess.find(filter, function(err, guesses){
			if(err) callback(err);
			callback(guesses);

		}).populate('relatedStage');

	};

	this.save = function(object, callback) {

		var globalGuesses = [];

		if(Array.isArray(object)) {globalGuesses = object} else {globalGuesses.push(object)}

		var promises = globalGuesses.map(function(guess){
			return GlobalGuess.asyncUpsert(guess._id, guess);
		});

		Promise.all(promises).then(doc => callback(doc)).catch(err => callback(err));
	};

	this.delete = function(filter, callback){
		GlobalGuess.deleteMany(filter, function(err){
			if(err) console.log(err);

			callback(true);
			
		});
	};
};
