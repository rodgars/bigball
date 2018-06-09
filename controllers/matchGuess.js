const ObjectId = require('mongodb').ObjectID;
var MatchGuess = require('../models/MatchGuess');
var emptyMatchGuesses = require('../misc/MatchGuess.json');

module.exports = function(){

	this.get = function(filter, callback){
		
		MatchGuess.find(filter, function(err, guesses){

			if(err) callback(err);
			callback(guesses);

		}).populate({path:'stageGuess', populate: { path: 'mainGuess' }}).populate('relatedMatch');

	};

	this.save = function(object, callback) {

		var matchGuesses = [];

		if(Array.isArray(object)) {matchGuesses = object} else {matchGuesses.push(object)}

		var promises = matchGuesses.map(function(guess){
			return MatchGuess.asyncUpsert(guess._id, guess);
		});

		Promise.all(promises).then(doc => callback(doc)).catch(err => callback(err));
	};

	this.delete = function(filter, callback){
		MatchGuess.deleteMany(filter, function(err){
			if(err) console.log(err);

			callback(true);
			
		});
	};
};
