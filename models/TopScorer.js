var mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
var { Schema } = mongoose;

var topScorerSchema = new Schema({
	_id: String,
	player: {type: Number, ref: 'Player'},
	goals: Number
}, { versionKey: false });

topScorerSchema.static('asyncUpsert', function (id, topScorer, callback) {

	var model = this;
	return new Promise(function(resolve, reject){

		if(!id) {id = new ObjectId();}

		console.log(topScorer);

		model.findByIdAndUpdate(id, topScorer, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);

			resolve(doc);
		}).populate('player');
	});
});

module.exports = mongoose.model('TopScorer', topScorerSchema);
