const mongoose = require("mongoose");
const { Schema } = mongoose;

const controlSchema = new Schema({
});

module.exports = mongoose.model('control', controlSchema);
