const Inscription = require('../models/inscriptionModel');

// Afficher la page d'inscription à l'atelier d'improvisation avancée
exports.getListeImproAvancee = (req, res) => {
    Inscription.find({ atelier: 'Atelier d\'improvisation avancée' })
        .then(inscriptions => {
            res.render('liste', { title: 'Liste des inscrits - Improvisation Avancée', inscriptions });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération de la liste des inscrits');
        });
};

// Afficher la liste des inscrits à l'atelier d'improvisation tous niveaux
exports.getListeImproTousNiveaux = (req, res) => {
    Inscription.find({ atelier: 'Atelier d\'improvisation tous niveaux' })
        .then(inscriptions => {
            res.render('liste', { title: 'Liste des inscrits - Improvisation Tous Niveaux', inscriptions });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération de la liste des inscrits');
        });
};

// Afficher la liste des inscrits à l'atelier d'éloquence
exports.getListeEloquence = (req, res) => {
    Inscription.find({ atelier: 'Atelier d\'éloquence' })
        .then(inscriptions => {
            res.render('liste', { title: 'Liste des inscrits - Éloquence', inscriptions });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération de la liste des inscrits');
        });
};

// Inscription à un atelier (dans la bdd)
exports.postInscription = (req, res) => {
    const { atelier, nom, prenom, mail } = req.body;
    // on regarde s'il est déjà inscrit
    // si oui, on renvoie un message d'erreur
    // sinon, on l'inscrit
    Inscription.findOne({ atelier: atelier, nom: nom, prenom: prenom, mail: mail })
        .then(existingInscription => {
            if (existingInscription) {
                const message = "Vous êtes déjà inscrit à cet atelier.";
                res.render('message', { message });
            } else {
                const newInscription = new Inscription({ atelier, nom, prenom, mail });
                newInscription.save()
                    .then(() => {
                        const message = "Inscription réussie ! Merci de votre participation.";
                        res.render('message', { message });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('Erreur lors de l\'enregistrement de l\'inscription.');
                    });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la vérification de l\'inscription existante.');
        });


};