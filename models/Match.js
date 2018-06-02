var mongoose = require("mongoose");
var { Schema } = mongoose;

var matchSchema = new Schema({
	_id: Number,
	group: String,
	date: Date,
	homeTeam: { type: String, ref: 'Team' },
	visitorTeam: { type: String, ref: 'Team' },
	goals: [{type: Schema.Types.ObjectId, ref: 'Goal'}],
	winner: { type: Schema.Types.ObjectId, ref: 'Team' }
}, { versionKey: false });

matchSchema.statics.loadDictionary = function(cb) {

	var matchDictionary = {};

	this.find(function(err, matches){

		if(err) console.log(err);

		for(var index in matches){
			matchDictionary[matches[index]._id] = matches[index];
		}

		cb(matchDictionary);
	});
};

module.exports = mongoose.model('Match', matchSchema);
