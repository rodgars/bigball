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
});

autoIncrement.initialize(mongoose.connection);

userSchema.plugin(autoIncrement.plugin, {model: 'user', field: 'userId'});

userSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

userSchema.post('save', function () {
	if (this.wasNew) {
		var guess = new Guess({user: this});
		guess.save(function(err, doc){
			if(err) console.log(err);
		});
	}
});
mongoose.model('user', userSchema);
