const mongoose = require('mongoose');

const evenementSchema = new mongoose.Schema({
    titre: String,
    description: String,
    endDate: String
});

module.exports = mongoose.model('Evenement', evenementSchema);