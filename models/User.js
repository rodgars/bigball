const mongoose = require("mongoose");
//const Schema = mongoose.Schema; essa instrucao é igual a debaixo
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    isAdmin: {type:Boolean, default:false},
    urlImg: String,
    name: String,
    email: String
});

mongoose.model('user', userSchema);