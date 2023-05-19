const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); // Require the necessary discord.js classes

module.exports = {
    data: new SlashCommandBuilder() // Creates a new SlashCommand
        .setName('avatar') // The name of the command
        .setDescription('Replies with the users avatar') // The description of the command
        .addUserOption(option => option.setName('user').setDescription('The user to get the avatar of').setRequired(false)), // The user option to get the avatar of
    async execute(interaction) { // Executes the command
        let usr = interaction.options.getUser('user') || interaction.user; // If the user option is not provided, it will use the user who ran the command
        const embed = new EmbedBuilder() // Creates a new embed
        .setTitle(`${usr.username}'s Avatar`) // Sets the title of the embed to the user's username
        .setImage(usr.displayAvatarURL({dynamic: true, size: 4096})) // Sets the image of the embed to the avatar of the user
        .setColor(0x6600ff) // Sets the color of the embed to purple
        .setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}) // This will show who requested the avatar
        .setTimestamp(); // Sets the timestamp of the embed
        await interaction.reply({ embeds: [embed] }); // Replies with the embed
    }
}
