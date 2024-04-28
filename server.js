const express = require('express');
const inscriptionController = require('./controllers/inscriptionController');
const presenceController = require('./controllers/presenceController');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 4000;
require('dotenv').config();
// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('Connected to Mongodb.'));

//tache cron

require('./cron/deleteOldInscriptions');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.post('/inscription', inscriptionController.postInscription);
app.post('/presence', presenceController.postPresence);

// Route pour afficher la liste des inscrits à un atelier
app.get('/liste/:atelier', inscriptionController.getListe);


const desinscriptionController = require('./controllers/desinscriptionController');

// Route pour afficher la page de désinscription
app.get('/desinscription', desinscriptionController.getDesinscriptionPage);

// Route pour gérer la désinscription
app.post('/desinscription', desinscriptionController.postDesinscription);


// Configuration du moteur de template EJS
app.set('view engine', 'ejs');

app.get('/list', (req, res) => {
    res.render('liste-atelier');
});

app.get('/inscription', (req, res) => {
    res.render('inscription');
});
/*
app.get('/', (req, res) => {
    res.render('index');
});
*/
let Event = require('./models/evenementModel');
app.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.render('index', { events });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.get('/tuto', (req, res) => {
    res.render('tuto');
});

app.get('/mention', (req, res) => {
    res.render('mention');
});

app.get('/documentation', (req, res) => {
    res.render('documentation');
});

app.get('/presence', presenceController.getPresenceForm);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

/*
app.listen(port, '194.164.199.114', () => {
    console.log(`Serveur Express écoutant sur le port ${port}`);
});                 
*/