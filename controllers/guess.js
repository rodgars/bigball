var Guess = require('../models/Guess');

module.exports = function(){

	this.get = function(loggedUser, callback){

		Guess.find({user: loggedUser._id}, function(err, guess){

			if(err) console.log(err);

			callback(guess);

		});
	};

	this.save = function(guessJson, callback) {	

		var guess = new Guess(guessJson);

		guess.save(function(err, docs){

			if(err) console.log(err);

			callback(docs);
		});
	};

	this.deleteAll = function(callback){
		Guess.collection.drop(function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

};
