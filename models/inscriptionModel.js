const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
    atelier: String,
    nom: String,
    prenom: String
});

module.exports = mongoose.model('Inscription', inscriptionSchema);