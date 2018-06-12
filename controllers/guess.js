const Guess = require('../models/Guess');
const GlobalGuess = require('../models/GlobalGuess');
const StageGuess = require('../models/StageGuess');
const MatchGuess = require('../models/MatchGuess');

module.exports = function(){

	this.get = function(filter, loggedUser, callback){

		var query = Guess.find(filter)
			.populate('user')
			.populate({path: 'globalGuess', populate: {path: 'relatedStage'}})
			.populate({path: 'globalGuess', populate: {path: 'teamGP'}})
			.populate({path: 'globalGuess', populate: {path: 'teamGC'}})
			.populate({
				path:'stageGuesses',
				populate: {
					path: 'matchGuesses', populate: {path: 'relatedMatch'}}})
			.populate({
				path:'stageGuesses',
				populate: {
					path: 'relatedStage' }});

		query.then(function(guesses){

			var result = [];

			guesses.forEach(function(guess){

				guess = guess.toObject();
				result.push(guess);

				let removeOpenStages = !guess.user._id.equals(loggedUser);

				if((guess.globalGuess.status == 'closed') || (guess.globalGuess.status == 'opened' && removeOpenStages)) {

					delete guess.globalGuess.firstPlace;
					delete guess.globalGuess.secondPlace;
					delete guess.globalGuess.thirdPlace;
					delete guess.globalGuess.topScorer;
					delete guess.globalGuess.teamGP;
					delete guess.globalGuess.teamGC;
					delete guess.globalGuess.pointsChampions;
					delete guess.globalGuess.pointsTeamGP;
					delete guess.globalGuess.pointsTeamGC;
					delete guess.globalGuess.pointsTopScorer;

				}

				guess.stageGuesses.forEach(function(stageGuess){

					if( (stageGuess.status == 'closed') || (stageGuess.status == 'opened' && removeOpenStages)) {
						delete stageGuess.pointsDoubleMatch;
						delete stageGuess.doubleMatch;
						delete stageGuess.matchGuesses;
					}
				});

			});

			callback(result);
		}).catch(err => console.log('controller/guess/111'));
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
