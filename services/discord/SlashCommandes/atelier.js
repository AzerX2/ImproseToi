const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('atelier')
        .setDescription('info sur les personnes inscrites au prochain atelier')
        .addStringOption(option =>
            option.setName('atelier')
                .setDescription('Choisissez votre atelier')
                .setRequired(true)
                .addChoices({ name: 'Improvisation Avancé', value: 'Atelier d\'improvisation avancée' }, { name: 'Eloquence', value: 'Atelier d\'éloquence' }, { name: 'Improvisation Tout niveau', value: 'Atelier d\'improvisation tous niveaux' })
        ),
    async execute(interaction) {
        let inscription = require('../../../models/inscriptionModel')
        let inscrits = await inscription.find({}).exec()
        let embed = new MessageEmbed()
            .setTitle("Inscrits à l'atelier")
            .setDescription("Liste des personnes inscrites à l'atelier")
            .setColor("#00ff00")
            .setTimestamp()
        
        let atelier = interaction.options.getString('atelier');


        if (inscrits.length == 0) {
            embed.addFields({
                name: "Liste des inscrits sur l' " + atelier,
                value: "Aucun inscrit pour le moment"
            
            })
        }
        else {
            let liste = ""
            for (let i = 0; i < inscrits.length; i++) {
                if (inscrits[i].atelier != atelier) continue
                liste += " > " + inscrits[i].prenom + " " + inscrits[i].nom + "\n"
            }
            embed.addFields({
                name: "Liste des inscrits sur l' " + atelier,
                value: liste
            })
        }

        let row = new MessageActionRow()
            .addComponents(
            new MessageButton()
            .setLabel('Inscription')
            .setURL("https://improsetoi.fr/inscription")
            .setStyle('LINK'),
            )
            .addComponents(
            new MessageButton()
            .setLabel('Désinscription')
            .setURL("https://improsetoi.fr/desinscription")
            .setStyle('LINK'),
            )
        await interaction.reply({ embeds: [embed], components: [row] })
    
    }
};