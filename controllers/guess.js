const ObjectId = require('mongodb').ObjectID;
var Guess = require('../models/Guess');

var emptyGuessJson = require('../misc/NewGuess.json');

module.exports = function(){

	var saveGuess = this.save;

	this.get = function(userId, callback){
		
		// recupera o guess do banco de dados
		var findPromise = new Promise(function(resolve, reject){
			Guess.find({user: userId}, function(err, guesses){

				if(err) reject(err);
				resolve(guesses);

			}).populate('stageGuesses.relatedStage').populate('stageGuesses.matchGuesses.relatedMatch').populate('stageGuesses.doubleMatch').populate('user');
		});

		findPromise.then(function(guessesMongo){

			// se nao existe
			if(guessesMongo.length == 0){

				guesses = [];
				emptyGuessJson.user = userId;

				// insere a guess padrao
				Guess.asyncUpsert(emptyGuessJson._id, emptyGuessJson).then(function(doc){

					guessesMongo.push(doc);

					var guesses = guessesMongo.map(function(guessMongo){
						return Guess.transform(guessMongo);
					});

					callback(guesses);

				}).catch(function(err){callback(err);});

			}  else {

				var guesses = guessesMongo.map(function(guessMongo){
					return Guess.transform(guessMongo);
				});

				callback(guesses);
			}

		}).catch(function(error){
			callback(error);
		});
	};

	this.save = function(object, callback) {

		var guesses = [];

		if(Array.isArray(object)) {guesses = object} else {guesses.push(object)}

		var promises = guesses.map(function(guess){
			return Guess.asyncUpsert(guess._id, guess);
		});

		Promise.all(promises).then(doc => callback(doc)).catch(err => callback(err));
	};

	this.deleteAll = function(callback){
		Guess.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

	this.saveMatchGuess = function(userId, stageId, matchGuess, callback){

		var findPromise = new Promise(function(resolve, reject){
			Guess.find({user: userId}, function(err, guesses){

				if(err) reject(err);
				resolve(guesses);

			}).populate('stageGuesses.relatedStage').populate('stageGuesses.matchGuesses.relatedMatch').populate('stageGuesses.doubleMatch').populate('user');
		});

		findPromise.then(function(doc){
			console.log(doc);
		}).catch(function(err){

		});

		callback(true);
	};

};
