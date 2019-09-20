  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dog = new Schema({
    name: String,
});

module.exports = mongoose.model('Dog', Dog);