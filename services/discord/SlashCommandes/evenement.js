const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

/**
 * 
 * Le principe de la commande est de permettre de gérer les évenements affiché sur le site
 * donc c'est une commande qui est réservé à l'administrateur
 * il y a :
 * - commande pour afficher les evenements stocké dans la bdd
 * - commande pour ajouter un evenement
 * - commande pour supprimer un evenement
 * - commande pour modifier un evenement
 * 
 * pour les donnée stocké dans l'évenement il y a le titre et la description 
 * 
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('evenement')
        .setDescription('Permet de gérée les évenements affiché sur le site')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ajouter')
                .setDescription('Ajouter un évenement')
                .addStringOption(option =>
                    option.setName('titre')
                        .setDescription('Le titre de l\'évenement')
                        .setRequired(true)
                    
                )
                .addStringOption(option =>
                    option.setName('description')
                        .setDescription('La description de l\'évenement')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('supprimer')
                .setDescription('Supprimer un évenement')
                .addStringOption(option =>
                    option.setName('titre')
                        .setDescription('Le titre de l\'évenement')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('modifier')
                .setDescription('Modifier un évenement')
                .addStringOption(option =>
                    option.setName('titre')
                        .setDescription('Le titre de l\'évenement')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('description')
                        .setDescription('La description de l\'évenement')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('afficher')
                .setDescription('Afficher les évenements')
        ),
    async execute(interaction) {
        let evenement = require('../../../models/evenementModel')

        let sousCommande = interaction.options.getSubcommand()
        let titre = interaction.options.getString('titre')
        let description = interaction.options.getString('description')

        if (sousCommande === 'ajouter') {
            let newEvenement = new evenement({
                titre: titre,
                description: description
            })

            newEvenement.save()
            await interaction.reply({ content: 'Evenement ajouté', ephemeral: true })
        }
        else if (sousCommande === 'supprimer') {
            let evenementSupprimer = await evenement.findOneAndDelete({ titre: titre }).exec()
            if (evenementSupprimer) {
                await interaction.reply({ content: 'Evenement supprimé', ephemeral: true })
            }
            else {
                await interaction.reply({ content: 'Evenement non trouvé', ephemeral: true })
            }
        }
        else if (sousCommande === 'modifier') {
            let evenementModifier = await evenement.findOneAndUpdate({ titre: titre }, { description: description }).exec()
            if (evenementModifier) {
                await interaction.reply({ content: 'Evenement modifié', ephemeral: true })
            }
            else {
                await interaction.reply({ content: 'Evenement non trouvé', ephemeral: true })
            }
        }
        else if (sousCommande === 'afficher') {
            let evenements = await evenement.find({}).exec()
            let embed = new MessageEmbed()
                .setTitle("Evenements")
                
                .setColor("#00ff00")
                .setTimestamp()

            let liste = ""
            if (evenements.length != 0) {
                for (let i = 0; i < evenements.length; i++) {
                    liste += evenements[i].titre + " : " + evenements[i].description + "\n"
                }
            }
            if (liste === "") {
                liste = "Aucun evenement"
            }
            embed.setDescription("Liste des evenements\n\n" + liste)

            await interaction.reply({ embeds: [embed] })
        }
    }
};