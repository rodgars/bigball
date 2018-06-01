const mongoose = require("mongoose");
const { Schema } = mongoose;

const controlSchema = new Schema({
});

mongoose.model('control', controlSchema);
