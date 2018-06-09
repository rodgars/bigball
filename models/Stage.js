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

module.exports = mongoose.model('Stage', stageSchema);

