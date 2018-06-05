var mongoose = require("mongoose");
var { Schema } = mongoose;

var accountSchema = new Schema({
	_id: String,
	account: String,
	agency: String,
	bank: String,
	register: String
}, { versionKey: false });

module.exports = mongoose.model('Account', accountSchema);
