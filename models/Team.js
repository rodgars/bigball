var mongoose = require("mongoose");
var { Schema } = mongoose;

var teamSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name:  String,
	flagCode: String
});

teamSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('Team', teamSchema);
