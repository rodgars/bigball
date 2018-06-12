var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var { Schema } = mongoose;

var guessSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: 'user'},
	totalPoints: Number,
	position: Number,
	globalGuess: { type: Schema.Types.ObjectId, ref: 'GlobalGuess'},
	stageGuesses: [{ type: Schema.Types.ObjectId, ref: 'StageGuess'}]
}, { versionKey: false });

guessSchema.static('asyncUpsert', function (id, guess, callback) {
	var model = this;
	return new Promise(function(resolve, reject){

		if(!id) id = new ObjectId();

		model.findByIdAndUpdate(id, guess, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);
			resolve(doc);
		});
	});
});

module.exports = mongoose.model('Guess', guessSchema);

