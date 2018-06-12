const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Guess = require('./Guess');
const Ranking = require('./Ranking');
const { Schema } = mongoose;

const GuessController = require('../controllers/guess');
const guessController = new GuessController();
const GlobalGuessController = require('../controllers/globalGuess');
const globalGuessController = new GlobalGuessController();
const StageGuessController = require('../controllers/stageGuess');
const stageGuessController = new StageGuessController();
const MatchGuessController = require('../controllers/matchGuess');
const matchGuessController = new MatchGuessController();
const ObjectID = require('mongodb').ObjectID;

const _guessJson = require('../misc/Guess.json');
const _globalGuessJson = require('../misc/GlobalGuess.json');
const _stageGuessesJson = require('../misc/StageGuess.json');
const _matchGuessesJson = require('../misc/MatchGuess.json');

const userSchema = new Schema({
    googleID: String,
    isAdmin: {type:Boolean, default:false},
    urlImg: String,
    registerDate: {type:Date, default: Date.now},
    name: String,
    email: String,
    isPaid: {type:Boolean, default:false}
}, { versionKey: false });

autoIncrement.initialize(mongoose.connection);

userSchema.plugin(autoIncrement.plugin, {model: 'user', field: 'userId'});


userSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

if (!userSchema.options.toObject) userSchema.options.toObject = {};
userSchema.options.toObject.transform = function (doc, ret, options) {
	
	if(ret.registerDate) ret.registerDate = ret.registerDate.toISOString().substring(0, 10);
	return ret;
}

userSchema.post('save', function () {
    if (this.wasNew) {
	var instance = this;
	let guessJson = JSON.parse(JSON.stringify(_guessJson));
	let globalGuessJson = JSON.parse(JSON.stringify(_globalGuessJson));
	let stageGuessesJson = JSON.parse(JSON.stringify(_stageGuessesJson));
	let matchGuessesJson = JSON.parse(JSON.stringify(_matchGuessesJson));

	guessJson.user = this._id;
	guessJson._id = new ObjectID();
	globalGuessJson._id = new ObjectID();
	guessJson.globalGuess = globalGuessJson._id;
	globalGuessJson.mainGuess = guessJson._id;
	stageGuessesJson.forEach(function(stageGuess){
		stageGuess.mainGuess = guessJson._id;
		stageGuess._id = new ObjectID();
		guessJson.stageGuesses.push(stageGuess._id);
	});

        var insereGuess = new Promise(function(resolve, reject){guessController.save(guessJson, function(doc){resolve(doc[0])})});

	insereGuess.catch(err => console.log(err));

	insereGuess.then(function(guess){
		var promises = [];
		var guessId = guess._id;

		promises.push( new Promise(function(resolve, reject){
			globalGuessController.save(globalGuessJson, function(doc){resolve(doc);});}) 
		);

		let matches = [];

		stageGuessesJson.forEach(function(stageGuessJson){
			let stageGuessId = stageGuessJson._id;
			stageGuessJson.matchGuesses = [];
			if(stageGuessJson.relatedStage == 'groupStage'){
				
				for(let i = 1; i < 49; i++){
					let matchId = new ObjectID();
					matches.push({_id: matchId, relatedMatch: i, points: 0, guess: {}, stageGuess: stageGuessId});
					stageGuessJson.matchGuesses.push(matchId);
				}
				
				} else if (stageGuessJson.relatedStage == 'eighthFinals') {
					for(let j = 49; j < 57; j++){
						let matchId = new ObjectID();
						matches.push({_id: matchId, relatedMatch: j, points: 0, guess: {}, stageGuess: stageGuessId});
						stageGuessJson.matchGuesses.push(matchId);
					}
				} else if (stageGuessJson.relatedStage == 'quarterFinals') {
					for(let k = 57; k < 61; k++){
						let matchId = new ObjectID();
						matches.push({_id: matchId, relatedMatch: k, points: 0, guess: {}, stageGuess: stageGuessId});
						stageGuessJson.matchGuesses.push(matchId);
					}
				} else if (stageGuessJson.relatedStage == 'semiFinals') {
					for(let l = 61; l < 63; l++){
						let matchId = new ObjectID();
						matches.push({_id: matchId, relatedMatch: l, points: 0, guess: {}, stageGuess: stageGuessId});
						stageGuessJson.matchGuesses.push(matchId);
					}
				} else {
					for(let m = 63; m < 65; m++){
						let matchId = new ObjectID();
						matches.push({_id: matchId, relatedMatch: m, points: 0, guess: {}, stageGuess: stageGuessId});
						stageGuessJson.matchGuesses.push(matchId);
					}
				}
		});

		promises.push(stageGuessesJson.map(function(stageGuessJson){return new Promise(function(resolve, reject){stageGuessController.save(stageGuessJson,function(stageGuess){
			resolve(stageGuess);
		})})}));
		
		promises.push(new Promise(function(res, rej){matchGuessController.save(matches, function(matches){res(matches)})}));
		
		var ranking = new Ranking();
		ranking._id = instance;
		ranking.total = 0;
		ranking.groups = 0;
		ranking.eighthFinals = 0;
		ranking.quarterFinals = 0;
		ranking.semiFinals = 0;
		ranking.finals = 0;
		ranking.teamGP = 0;
		ranking.teamGC = 0;
		ranking.topScorer = 0;
		ranking.champions = 0;
	
		promises.push(new Promise(function(res, rej){ Ranking.asyncUpsert(ranking._id, ranking).then(doc => res(doc))}));

		Promise.all(promises).then(function(){

		}).catch(err => console.log(err));
	});
    }
});

module.exports = mongoose.model('user', userSchema);
