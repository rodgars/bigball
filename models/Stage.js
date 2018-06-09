var mongoose = require("mongoose");
var { Schema } = mongoose;

var stageSchema = new Schema({
	_id: String,
	deadline:  Date,
	label: String,
	situation: {type: String, enum: ['Estamos aqui', 'Fase finalizada', 'Fase não iniciada']},
	status :{type: String, enum: ['completed', 'opened', 'closed']},
	order: Number,
	matches: [{type: Number, ref: 'Match'}]
}, { versionKey: false });

stageSchema.static('asyncUpsert', function (id, stage, callback) {

	var model = this;
	return new Promise(function(resolve, reject){

		model.findByIdAndUpdate(id, stage, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);

			resolve(doc);
		});
	});
});


if (!stageSchema.options.toObject) stageSchema.options.toObject = {};
stageSchema.options.toObject.transform = function (doc, ret, options) {

	ret.deadline = ret.deadline.toISOString().replace('T', ' ').substring(0, 19);

	return ret;
}

module.exports = mongoose.model('Stage', stageSchema);

