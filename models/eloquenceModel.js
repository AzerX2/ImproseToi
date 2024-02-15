const mongoose = require('mongoose');

const eloquenceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  participants: [{ type: String }],
});

const Eloquence = mongoose.model('Eloquence', eloquenceSchema);

module.exports = Eloquence;