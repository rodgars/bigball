const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
//const Schema = mongoose.Schema; essa instrucao é igual a debaixo
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
mongoose.model('user', userSchema);
