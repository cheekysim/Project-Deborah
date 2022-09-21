const { SlashCommandBuilder, EmbedBuilder} = require('discord.js'); // Require the necessary discord.js classes

module.exports = {
	data: new SlashCommandBuilder() // Creates a new SlashCommand
		.setName('id') // The name of the command
		.setDescription('Replies with the users id') // The description of the command
        .addUserOption(option => option.setName('user').setDescription('The user to get the id of').setRequired(false)), // The user option to get the id of
	async execute(interaction) { // Executes the command
        let usr = interaction.options.getUser('user') || interaction.user; // If the user option is not provided, it will use the user who ran the command
        const embed = new EmbedBuilder() // Creates a new embed
        .setAuthor({name: `${usr.username}'s ID`, iconURL: usr.displayAvatarURL({dynamic: true})}) // Sets the author of the embed to the user's username
        .setDescription(usr.id) // Sets the description of the embed to the id of the user
        .setColor('0x6600ff') // Sets the color of the embed to purple
        .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}) // This will show who requested the avatar
        .setTimestamp() // Sets the timestamp of the embed
		await interaction.reply({ embeds: [embed] }); // Replies with the embed
	},
};
