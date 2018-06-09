const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Guess = require('./Guess');
const { Schema } = mongoose;

const guessJson = require('../misc/Guess.json');
const GuessController = require('../controllers/guess');
const guessController = new GuessController();

const globalGuessJson = require('../misc/GlobalGuess.json');
const GlobalGuessController = require('../controllers/globalGuess');
const globalGuessController = new GlobalGuessController();

const stageGuessesJson = require('../misc/StageGuess.json');
const StageGuessController = require('../controllers/stageGuess');
const stageGuessController = new StageGuessController();

const matchGuessesJson = require('../misc/MatchGuess.json');
const MatchGuessController = require('../controllers/matchGuess');
const matchGuessController = new MatchGuessController();

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

userSchema.post('save', function () {
    if (this.wasNew) {
	
	guessJson.user = this._id;

        var insereGuess = new Promise(function(resolve, reject){guessController.save(guessJson, function(doc){resolve(doc[0]);});});

	insereGuess.then(function(guess){
		var promises = [];
		var guessId = guess._id;

		globalGuessJson.mainGuess = guessId;
		stageGuessesJson.forEach(function(stageGuess){stageGuess.mainGuess = guessId;});

		promises.push( new Promise(function(resolve, reject){globalGuessController.save(globalGuessJson, function(doc){resolve(doc);});}) );
		promises.push(stageGuessesJson.map(function(stageGuessJson){return new Promise(function(resolve, reject){stageGuessController.save(stageGuessJson,function(stageGuess){
			stageGuess = stageGuess[0];			
			let stageGuessId = stageGuess._id;
			let matches = [];

			if(stageGuess.relatedStage == 'groupStage'){
				for(let i = 1; i < 49; i++){matches.push({"relatedMatch": i, "points": 0, "guess": {}, "stageGuess": stageGuessId})}
			} else if (stageGuess.relatedStage == 'eighthFinals') {
				for(let j = 49; j < 57; j++){matches.push({"relatedMatch": j, "points": 0, "guess": {}, "stageGuess": stageGuessId})}
			} else if (stageGuess.relatedStage == 'quarterFinals') {
				for(let k = 57; k < 61; k++){matches.push({"relatedMatch": k, "points": 0, "guess": {}, "stageGuess": stageGuessId})}
			} else if (stageGuess.relatedStage == 'semiFinals') {
				for(let l = 61; l < 63; l++){matches.push({"relatedMatch": l, "points": 0, "guess": {}, "stageGuess": stageGuessId})}
			} else {
				for(let m = 63; m < 65; m++){matches.push({"relatedMatch": m, "points": 0, "guess": {}, "stageGuess": stageGuessId})}
			}

			new Promise(function(res, rej){matchGuessController.save(matches, function(docs){res(docs)})}).then(resolve(stageGuess));
		})})}));
						
		Promise.all(promises).then(function(){});
	});
    }
});

module.exports = mongoose.model('user', userSchema);
