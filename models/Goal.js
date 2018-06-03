var mongoose = require("mongoose");
var { Schema } = mongoose;

var goalSchema = new Schema({
	player: { type: Schema.Types.ObjectId, ref: 'Player'},
	team: { type: String, ref: 'Team'}
},{ _id : false });

module.exports = goalSchema;
