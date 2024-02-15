const mongoose = require('mongoose');

const improToutNiveauSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  participants: [{ type: String }],
});

const ImproToutNiveau = mongoose.model('ImproToutNiveau', improToutNiveauSchema);

module.exports = ImproToutNiveau;