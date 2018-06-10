const ObjectId = require('mongodb').ObjectID;
var StageGuess = require('../models/StageGuess');
var emptyStageGuesses = require('../misc/StageGuess.json');

module.exports = function(){

	this.get = function(filter, callback){
		
		StageGuess.find(filter, function(err, guesses){

			if(err) callback(err);
			callback(guesses);

		});

	};

	this.save = function(object, callback) {

		var stageGuesses = [];

		if(Array.isArray(object)) {stageGuesses = object} else {stageGuesses.push(object)}

		var promises = stageGuesses.map(function(guess){
			return StageGuess.asyncUpsert(guess._id, guess);
		});

		Promise.all(promises).then(doc => callback(doc)).catch(function(err){ console.log('err=>' + err); callback(err);});
	};

	this.delete = function(filter, callback){
		StageGuess.deleteMany(filter, function(err){
			if(err) console.log(err);

			callback(true);
			
		});
	};
};
