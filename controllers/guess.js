const ObjectId = require('mongodb').ObjectID;
var Guess = require('../models/Guess');

var newGuessJson = require('../misc/NewGuess.json');

module.exports = function(){

	this.get = function(loggedUser, callback){

		var promise = new Promise(function(resolve, reject){
			Guess.find({user: loggedUser._id}, function(err, guesses){

				if(err) reject(err);

				resolve(guesses);

			}).populate('stageGuesses.matchGuesses.relatedMatch').populate('stageGuesses.doubleMatch').populate('user');
		});

		promise.then(function(guessesMongo){

			if(guessesMongo.length == 0){
				guesses = [];
				guesses.push(newGuessJson);


			} else {

				var guesses = guessesMongo.map(function(guessMongo){
					return guessMongo.toObject();
				});

				guesses.forEach(function(guess){
					guess.stageGuesses.forEach(function(stageGuess){
						stageGuess.matchGuesses.forEach(function(matchGuess){
						
							matchGuess.result = {};

							matchGuess.date = matchGuess.relatedMatch.date;

							matchGuess.homeTeam = matchGuess.relatedMatch.homeTeam;

							matchGuess.visitorTeam = matchGuess.relatedMatch.visitorTeam;
							if(matchGuess.relatedMatch.winner){
								matchGuess.result.homeScore = matchGuess.relatedMatch.homeScore;
								matchGuess.result.visitorScore = matchGuess.relatedMatch.visitorScore;
								matchGuess.result.winner = matchGuess.relatedMatch.winner;
							}

							delete matchGuess.relatedMatch;
						});
					});
				});
			}

			callback(guesses);

		}).catch(function(error){
			callback(error);
		});
	};

	this.save = function(object, callback) {

		var guesses = [];

		if(Array.isArray(object)) {guesses = object} else {guesses.push(object)}

		var promises = guesses.map(function(guess){
			return new Promise(function(resolve, reject){

				let filter = guess._id ? { _id: guess._id } : { _id: new ObjectId() };

				Guess.findByIdAndUpdate(filter, guess, {upsert: true, new: true}, function(err, doc){
					if(err) reject(err);
					resolve(doc);
				});
			});
		});

		Promise.all(promises).then(doc => callback(doc)).catch(doc => callback(doc));
	};

	this.deleteAll = function(callback){
		Guess.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

};
