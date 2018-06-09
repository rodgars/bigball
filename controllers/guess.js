const Guess = require('../models/Guess');
const GlobalGuess = require('../models/GlobalGuess');
const StageGuess = require('../models/StageGuess');
const MatchGuess = require('../models/MatchGuess');

module.exports = function(){

	this.get = function(filter, callback){
		var response = [];
		var query = Guess.find(filter).populate('user');
		query.then(function(docs){
			var guesses = docs.forEach(function(gDocs){
				var guess = gDocs.toObject();
				let ggFilter = {mainGuess: guess._id};
				response.push(guess);
				let ggQuery = GlobalGuess.find(ggFilter).populate('relatedStage');
				ggQuery.then(function(ggDocs){

						let gGuess;
						
						gGuess = ggDocs[0].toObject();

						guess.globalGuess = gGuess;


						let sgFilter = {mainGuess: guess._id};
						let sgQuery = StageGuess.find(sgFilter).populate('relatedStage');
						sgQuery.then(function(sgDocs){
								let sGuesses = sgDocs.map(sDoc => sDoc.toObject());
								guess.stageGuesses = sGuesses;
								mgPromises = sGuesses.map(function(sGuess){
									return new Promise(function(resolve, reject){
										let mgFilter = {stageGuess: sGuess._id};
										let mgQuery = MatchGuess.find(mgFilter).populate('relatedMatch');
										sGuess.matchGuesses = null;
										mgQuery.then(function(mgDocs){
											let mGuesses = mgDocs.map(mgDoc => mgDoc.toObject());

											if(sGuess.status != 'closed'){ sGuess.matchGuesses = mGuesses;}

											resolve(true);
										}).catch(err=>console.log(err));
									})
								});
								Promise.all(mgPromises).then(function(){
									callback(response)
								});

						}).catch(err=>console.log(err));

				}).catch(err=>console.log(err));
			});
		}).catch(err=>console.log(err));
	};


	this.save = function(object, callback) {
		var guesses = [];
		if(Array.isArray(object)) {guesses = object} else {guesses.push(object)}
		var promises = guesses.map(function(guess){
			return Guess.asyncUpsert(guess._id, guess);
		});
		Promise.all(promises).then(doc => callback(doc)).catch(err => callback(err));
	};


	this.delete = function(filter, callback){
		Guess.deleteMany(filter, function(err){
			if(err) console.log(err);
			callback(true);
		});
	};
};
