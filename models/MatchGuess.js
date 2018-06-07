var mongoose = require("mongoose");
var { Schema } = mongoose;

var matchGuessSchema = new Schema({
	relatedMatch: {type: Number, ref: 'Match'},
	points: Number,
	guess: {homeScore: Number, visitorScore: Number, winner:{type: String, ref: 'Team'}}
}, {_id : false});

module.exports = matchGuessSchema;
