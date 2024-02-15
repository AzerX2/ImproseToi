const mongoose = require('mongoose');

const improAvanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  participants: [{ type: String }],
});

const ImproAvance = mongoose.model('ImproAvance', improAvanceSchema);

module.exports = ImproAvance;