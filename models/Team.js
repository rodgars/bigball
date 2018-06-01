const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
	name:  String,
	flagLink: String
});

teamSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('Team', teamSchema);
