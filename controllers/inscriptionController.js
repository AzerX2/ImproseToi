const Inscription = require('../models/inscriptionModel');

// Afficher la liste des inscrits pour un atelier donné
exports.getListe = (req, res) => {
    let { atelier } = req.params;
    switch (atelier) {
        case 'impro-avancee':
            atelier = 'Atelier d\'improvisation avancée';
            break;
        case 'impro-tous-niveaux':
            atelier = 'Atelier d\'improvisation tous niveaux';
            break;
        case 'eloquence':
            atelier = 'Atelier d\'éloquence';
            break;
        default:
            return res.status(400).send('Atelier non valide');
    }

    Inscription.find({ atelier: atelier })
        .then(inscriptions => {
            res.render('liste', { title: `Liste des inscrits - ${atelier}`, inscriptions });
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