const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bilan')
        .setDescription('bilan de présence sur un atelier')
        .addStringOption(option =>
            option.setName('atelier')
                .setDescription('Choisissez votre atelier')
                .setRequired(true)
                .addChoices({ name: 'Improvisation Avancé', value: 'improTN' }, { name: 'Eloquence', value: 'eloquence' }, { name: 'Improvisation Tout niveau', value: 'improA' })
        ),

    async execute(interaction) {
        //salon avis : 1195070442592010270

        let atelier = interaction.options.getString('atelier');

        if (atelier === 'improTN') {
            let improvisationToutNiveau = require('../../../models/improvisationToutNiveauModel');

            // c'est géré par date, donc dans la base de donnée il y a pour chaque date, une liste de personne présente .participants

            let BilanImpro = await improvisationToutNiveau.find({}).exec();

            let embed = new MessageEmbed()
                .setTitle("Bilan de présence sur l'atelier d'improvisation tout niveau")
                .setDescription("Catégorisé par date, avec une liste des personnes présentes par dates")
                .setColor("#00ff00")
                .setTimestamp()

            let liste = ""
            if (BilanImpro.length != 0) {
                
                for (let i = 0; i < BilanImpro.length; i++) {
                    liste += BilanImpro[i].date + " : " + BilanImpro[i].participants + "\n"
                }
            }
            fs.writeFile('BilanImproTN.txt', liste, (err) => {
                if (err) throw err;
                console.log('BilanImpro.txt has been saved!');
            });

            // on va aussi faire un fichier texte avec les dates et les participants qu'on va envoyer avec ce message

            setTimeout(() => {
                // suppression du fichier
                fs.unlink('BilanImproTN.txt', (err) => {
                    if (err) throw err;
                    console.log('BilanImproTN.txt was deleted');
                });
            }, 5000);

            await interaction.reply({ embeds: [embed], files: ['BilanImproTN.txt']});

        }
        else if (atelier === 'eloquence') {

            let eloquence = require('../../../models/eloquenceModel');

            let BilanEloquence = await eloquence.find({}).exec();

            let embed = new MessageEmbed()
                .setTitle("Bilan de présence sur l'atelier d'éloquence")
                .setDescription("Catégorisé par date, avec une liste des personnes présentes par dates")
                .setColor("#00ff00")
                .setTimestamp()

            let liste = ""

            if (BilanEloquence.length != 0) {
                for (let i = 0; i < BilanEloquence.length; i++) {
                    liste += BilanEloquence[i].date + " : " + BilanEloquence[i].participants + "\n"
                }
            }

            fs.writeFile('BilanEloquence.txt', liste, (err) => {
                if (err) throw err;
                console.log('BilanEloquence.txt has been saved!');
            });


            setTimeout(() => {
                // suppression du fichier
                fs.unlink('BilanEloquence.txt', (err) => {
                    if (err) throw err;
                    console.log('BilanEloquence.txt was deleted');
                });
            }, 5000);

            await interaction.reply({ embeds: [embed], files: ['BilanEloquence.txt'] });

        }
        else if (atelier === 'improA') {

            let improvisationAvance = require('../../../models/improvisationAvanceModel');

            let BilanImproAvance = await improvisationAvance.find({}).exec();

            let embed = new MessageEmbed()
                .setTitle("Bilan de présence sur l'atelier d'improvisation avancé")
                .setDescription("Catégorisé par date, avec une liste des personnes présentes par dates")
                .setColor("#00ff00")
                .setTimestamp()

            let liste = ""

            if (BilanImproAvance.length != 0) {
                for (let i = 0; i < BilanImproAvance.length; i++) {
                    liste += BilanImproAvance[i].date + " : " + BilanImproAvance[i].participants + "\n"
                }
            }

            fs.writeFile('BilanImproAvance.txt', liste, (err) => {
                if (err) throw err;
                console.log('BilanImproAvance.txt has been saved!');
            });

            setTimeout(() => {
                // suppression du fichier
                fs.unlink('BilanImproAvance.txt', (err) => {
                    if (err) throw err;
                    console.log('BilanImproAvance.txt was deleted');
                });
            }, 5000);

            await interaction.reply({ embeds: [embed], files: ['BilanImproAvance.txt'] });
        }
        else {
            await interaction.reply({ content: 'Erreur dans le choix de l\'atelier', ephemeral: true });
            return;
        }
    }
};