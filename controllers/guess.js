const ObjectId = require('mongodb').ObjectID;
var Guess = require('../models/Guess');

var newGuessJson = require('../misc/NewGuess.json');

var transformGuesses = function(guesses){
	guesses.forEach(function(guess){
		guess.stageGuesses.forEach(function(stageGuess){
			stageGuess.order = stageGuess.relatedStage.order;
			stageGuess.relatedStage = stageGuess.relatedStage._id;
			stageGuess.matchGuesses.forEach(function(matchGuess){
				if(!matchGuess.guess) matchGuess.guess = {};
				matchGuess.result = {};
				matchGuess.date = matchGuess.relatedMatch.date;
				matchGuess.homeTeam = matchGuess.relatedMatch.homeTeam;
				matchGuess.visitorTeam = matchGuess.relatedMatch.visitorTeam;
				matchGuess.group = matchGuess.relatedMatch.group;
				if(matchGuess.relatedMatch.winner){
					matchGuess.result.homeScore = matchGuess.relatedMatch.homeScore;
					matchGuess.result.visitorScore = matchGuess.relatedMatch.visitorScore;
					matchGuess.result.winner = matchGuess.relatedMatch.winner;
				}

				delete matchGuess.relatedMatch;
			});
		});
	});

	return guesses;
}

module.exports = function(){

	var saveGuess = this.save;

	this.get = function(userId, callback){
		
		console.log(1);

		// recupera o guess do banco de dados
		var promise = new Promise(function(resolve, reject){
			Guess.find({user: userId}, function(err, guesses){

				if(err) reject(err);
				console.log(2);
				resolve(guesses);

			}).populate('stageGuesses.relatedStage').populate('stageGuesses.matchGuesses.relatedMatch').populate('stageGuesses.doubleMatch').populate('user');
		});

		promise.then(function(guessesMongo){

			// se nao existe, insere a guess padrao
			if(guessesMongo.length == 0){

				console.log(3);

				guesses = [];
				newGuessJson.user = userId;

				var promise2 = new Promise(function(resolve, reject){
					console.log(4);

					let filter = newGuessJson._id ? { _id: newGuessJson._id } : { _id: new ObjectId() };

					Guess.findByIdAndUpdate(filter, newGuessJson, {upsert: true, new: true}, function(err, doc){
						if(err) reject(err);
						resolve(doc);
					}).populate('stageGuesses.relatedStage').populate('stageGuesses.matchGuesses.relatedMatch').populate('stageGuesses.doubleMatch').populate('user');
				});

				promise2.then(function(doc){
					console.log(5);
					guessesMongo.push(doc);
					console.log('length: ' +guessesMongo.length);

					var guesses = guessesMongo.map(function(guessMongo){
						console.log(6);
						return guessMongo.toObject();
					});

					guesses = transformGuesses(guesses);

					callback(guesses);
				});

			}  else {

				console.log('length: ' +guessesMongo.length);

				var guesses = guessesMongo.map(function(guessMongo){
					console.log(6);
					return guessMongo.toObject();
				});

				guesses = transformGuesses(guesses);


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
