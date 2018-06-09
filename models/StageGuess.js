var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var { Schema } = mongoose;

var stageGuessSchema = new Schema({
	mainGuess: {type: Schema.Types.ObjectId, ref: 'Guess'},
	deadline: Date,
	locked: Boolean,
	relatedStage: {type: String, ref: 'Stage'},
	doubleMatch: {type: Number, ref: 'Match'},
	pointsDoubleMatch: Number
}, {versionKey: false });

stageGuessSchema.static('asyncUpsert', function (id, stageGuess, callback) {

	var model = this;
	return new Promise(function(resolve, reject){

		if(!id) {id = new ObjectId();}

		model.findByIdAndUpdate(id, stageGuess, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);

			resolve(doc);
		});
	});
});

if (!stageGuessSchema.options.toObject) stageGuessSchema.options.toObject = {};
stageGuessSchema.options.toObject.transform = function (doc, ret, options) {

	if(ret.relatedStage){
		ret.label = ret.relatedStage.label;
		ret.situation = ret.relatedStage.situation;
		ret.locked = ret.relatedStage.locked;
		ret.order = ret.relatedStage.order;
		ret.relatedStage = ret.relatedStage._id;
	}

	ret.deadline = ret.deadline.toISOString().replace('T', ' ').substring(0, 19);

	delete ret.mainGuess;


	return ret;

}

module.exports = mongoose.model('StageGuess', stageGuessSchema);
