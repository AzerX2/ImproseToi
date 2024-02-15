const ImproToutNiveau = require('../models/improToutNiveauModel');
const ImproAvance = require('../models/improAvanceModel');
const Eloquence = require('../models/eloquenceModel');
// Afficher le formulaire de présence
exports.getPresenceForm = (req, res) => {
    res.render('presence');
};

// Enregistrer la présence
exports.postPresence = (req, res) => {
    const { atelier, nom, prenom } = req.body;
    const today = new Date();

    // Sélectionner le modèle d'atelier en fonction de l'atelier choisi
    let AtelierModel;
    switch (atelier) {
        case 'Atelier d\'improvisation tous niveaux':
            AtelierModel = ImproToutNiveau;
            break;
        case 'Atelier d\'improvisation avancée':
            AtelierModel = ImproAvance;
            break;
        case 'Atelier d\'éloquence':
            AtelierModel = Eloquence;
            break;
        default:
            return res.status(400).send('Atelier non valide');
    }
    // on va parcourir toute les date et si le jour de la date est le meme que today on va ajouter le nom et prenom a la liste des participants
    let boolean = false;
    AtelierModel.find().then(ateliers => {
        ateliers.forEach(atelier => {
            if (atelier.date.getDate() === today.getDate() && atelier.date.getMonth() === today.getMonth() && atelier.date.getFullYear() === today.getFullYear()) {
                boolean = true;
                atelier.participants.push(`${prenom} ${nom}`);
                atelier.save()
                    .then(() => {
                        const message = "Présence enregistrée.";
                        res.render('message', { message });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send('Erreur lors de l\'enregistrement de la présence');
                    });
            }
        })
    })
    setTimeout(() => {
        // si l'atelier n'existe pas on le crée
        if (!boolean) {
            const newAtelier = new AtelierModel({ date: today, participants: [`${prenom} ${nom}`] });
            newAtelier.save()
                .then(() => {
                    const message = "Présence enregistrée.";
                    res.render('message', { message });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send('Erreur lors de l\'enregistrement de la présence');
                });
        }
    }, 1000);

};