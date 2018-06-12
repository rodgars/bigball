var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
const Guess = require('./Guess');
var { Schema } = mongoose;

var rankingSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: 'user'},
	total: Number,
	groups: Number,
	eighthFinals: Number,
	quarterFinals: Number,
	semiFinals: Number,
	finals: Number,
	teamGP: Number,
	teamGC: Number,
	topScorer: Number,
	champions: Number
}, { versionKey: false });

rankingSchema.static('asyncUpsert', function (id, ranking) {
	var model = this;
	return new Promise(function(resolve, reject){

		if(!id) id = new ObjectId();

		model.findByIdAndUpdate(id, ranking, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);
			resolve(doc);
		});
	});
});

rankingSchema.static('updateRanking', function () {
	var model = this;
	return new Promise(function(resolve, reject){

		var query = Guess.find()
			.populate('user')
			.populate({ path: 'globalGuess', populate: {path: 'teamGC'} })
			.populate({ path: 'globalGuess', populate: {path: 'teamGP'} })
			.populate('stageGuesses');


		query.then(function(guesses){

			var promises = guesses.map(function(guess){

				return new Promise(function(resolve, reject){
					var total = 0;
					var ranking = new model();

					ranking._id = guess.user._id;
					ranking.user = guess.user._id;

					var gg = guess.globalGuess;

					guess.stageGuesses.forEach(function(sg){

						switch(sg.relatedStage) {
						    case 'groupStage':
							ranking.groups = sg.pointsMatchGuesses + sg.pointsDoubleMatch;
							break;
						    case 'eighthFinals':
							ranking.eighthFinals = sg.pointsMatchGuesses + sg.pointsDoubleMatch;
							break;
						    case 'quarterFinals':
							ranking.quarterFinals = sg.pointsMatchGuesses + sg.pointsDoubleMatch;
							break;
						    case 'semiFinals':
							ranking.semiFinals = sg.pointsMatchGuesses + sg.pointsDoubleMatch;
							break;
						    case 'finals':
							ranking.finals = sg.pointsMatchGuesses + sg.pointsDoubleMatch;
							break;
						    default:
							throw 'Stage nao identificado'; 
						}
						
						total += sg.pointsMatchGuesses + sg.pointsDoubleMatch;
					});

					ranking.teamGP = gg.teamGP.gp ? gg.teamGP.gp : 0;
					total += ranking.teamGP;

					ranking.teamGC = gg.teamGC.gc ? gg.teamGC.gc : 0;
					total += ranking.teamGC;

					ranking.topScorer = gg.pointsTopScorer ? gg.pointsTopScorer : 0;
					total += ranking.topScorer;

					ranking.champions = gg.pointsChampions ? gg.pointsChampions : 0 + 
						gg.pointsSecondPlace ? gg.pointsSecondPlace : 0  +
						gg.pointsThirdPlace ? gg.pointsThirdPlace : 0;
					total += ranking.champions;

					ranking.total = total;

					model.asyncUpsert(ranking._id, ranking).then(resolve(ranking));
				});
			
			});

			Promise.all(promises).then(function(rankings){

				resolve(rankings);

			}).catch(err => reject(err));


		}).catch(err => callback(err));

	});
});

module.exports = mongoose.model('Ranking', rankingSchema);

