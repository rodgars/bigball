const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var Guess = require('./Guess');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    isAdmin: {type:Boolean, default:false},
    urlImg: String,
    name: String,
    email: String,
    isPaid: {type:Boolean, default:false}
}, { versionKey: false });

autoIncrement.initialize(mongoose.connection);

userSchema.plugin(autoIncrement.plugin, {model: 'user', field: 'userId'});

module.exports = mongoose.model('user', userSchema);
