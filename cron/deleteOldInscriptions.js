const cron = require('node-cron');
const Inscription = require('../models/inscriptionModel');

// Tâche planifiée pour supprimer les inscriptions tous les vendredis à 8h
cron.schedule('0 8 * * 5', () => {
    // Supprimer toutes les inscriptions
    Inscription.deleteMany({})
        .then(() => {
            console.log('Toutes les inscriptions ont été supprimées.');
        })
        .catch(err => {
            console.error('Erreur lors de la suppression des inscriptions :', err);
        });
});