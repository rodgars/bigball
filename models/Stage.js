var mongoose = require("mongoose");
var { Schema } = mongoose;

var stageSchema = new Schema({
	_id: String,
	deadline:  Date,
	label: String,
	situation: {type: String, enum: ['Estamos aqui', 'Fase finalizada', 'Fase não iniciada']},
	locked: Boolean,
	matches: [{type: Number, ref: 'Match'}]
}, { versionKey: false });

module.exports = mongoose.model('Stage', stageSchema);

