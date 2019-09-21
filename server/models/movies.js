  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Movies = new Schema({
    name: String,
    isWatched: Boolean
});

module.exports = mongoose.model('Movies', Movies);