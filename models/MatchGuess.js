var mongoose = require("mongoose");
var { Schema } = mongoose;

var matchGuessSchema = new Schema({
	relatedMatch: Number,
	homeScore: Number,
	visitorScore: Number,
	winner:{type: String, ref: "Team"},
	points: Number
});

module.exports = matchGuessSchema;
