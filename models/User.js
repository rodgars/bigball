const mongoose = require("mongoose");
//const Schema = mongoose.Schema; essa instrucao é igual a debaixo
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    isAdmin: {type:Boolean, default:false}
});

mongoose.model('user', userSchema);