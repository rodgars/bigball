const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema({
});

mongoose.model('player', playerSchema);
