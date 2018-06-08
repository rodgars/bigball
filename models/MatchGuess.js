var mongoose = require("mongoose");
var { Schema } = mongoose;

var matchGuessSchema = new Schema({
	relatedMatch: {type: Number, unique: true, ref: 'Match'},
	points: Number,
	guess: {homeScore: Number, visitorScore: Number, winner:{type: String, ref: 'Team'}}
}, {_id : false, versionKey: false });

module.exports = matchGuessSchema;
