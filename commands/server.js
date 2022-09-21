const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); // Require the necessary discord.js classes

module.exports = {
    data: new SlashCommandBuilder() // Creates a new SlashCommand
        .setName('server') // The name of the command
        .setDescription('Replies with server info!'), // The description of the command
    async execute(interaction) { // Executes the command
        const embed = new EmbedBuilder() // Creates a new embed
            .setTitle('Server info') // Sets the title of the embed to Server info
            .addFields( // Adds fields to the embed
                {name: 'Server name', value: interaction.guild.name.toString(), inline: true}, // The name of the server
                {name: 'Total members', value: interaction.guild.memberCount.toString(), inline: true}, // The total amount of members in the server
                {name: 'Created at', value: interaction.guild.createdAt.toString(), inline: true}) // When the server was created
            .setColor(0x6600ff) // Sets the color of the embed to purple
            .setThumbnail(interaction.guild.iconURL({ dynamic: true })) // Sets the thumbnail of the embed to the server icon
            .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}) // This will show who requested the avatar
            .setTimestamp(); // Sets the timestamp of the embed

        await interaction.reply({ embeds: [embed] }); // Replies with the embed
    }
}