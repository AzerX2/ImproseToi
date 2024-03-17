const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('permet d\'afficher les commandes disponibles'),
    async execute(interaction) {
    
        let embed = new MessageEmbed()
            .setTitle("Liste des commandes")
            .setDescription("Liste des commandes disponibles")
            .setColor("#00ff00")
            .setTimestamp()
            .addFields(
                { name: "/ping", value: "Affiche le ping du bot" },
                { name: "/atelier", value: "Affiche les personnes inscrites à un atelier" },
                { name: "/evenement", value: "Permet de gérée les évenements affiché sur le site" }
            )
        await interaction.reply({ embeds: [embed] })

    }
};