// Importation du modèle Inscription
const Inscription = require('../models/inscriptionModel');

// Fonction pour afficher la page de désinscription
exports.getDesinscriptionPage = (req, res) => {
    res.render('desinscription');
};

// Fonction pour gérer la désinscription
exports.postDesinscription = (req, res) => {
    const { atelier, nom, prenom } = req.body;

    Inscription.findOneAndDelete({ atelier: atelier, nom: nom, prenom: prenom })
        .then(() => {
            const message = "Désinscription réussie.";
            res.render('message', { message });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la désinscription');
        });
};