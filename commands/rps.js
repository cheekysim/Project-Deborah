const { SlashCommandBuilder, EmbedBuilder} = require('discord.js'); // Require the necessary discord.js classes

module.exports = {
	data: new SlashCommandBuilder() // Creates a new SlashCommand
		.setName('rps') // The name of the command
		.setDescription('Rock. Paper. Scissors.') // The description of the command
        .addUserOption(option => option.setName('user').setDescription('The user to fight against! Currently Unavailabe.').setRequired(false)), // The user option to fight against
	async execute(interaction) { // Executes the command
        let usr = interaction.options.getUser('user') || null; // If the user option is not provided, it will use null
        const embed = new EmbedBuilder() // Creates a new embed
        .setAuthor({name: `${usr.username}'s ID`, iconURL: usr.displayAvatarURL({dynamic: true})}) // Sets the author of the embed to the user's username
        .setDescription(usr.id) // Sets the description of the embed to the id of the user
        .setColor('0x6600ff') // Sets the color of the embed to purple
        .setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}) // This will show who requested the avatar
        .setTimestamp() // Sets the timestamp of the embed
		await interaction.reply({ embeds: [embed] }); // Replies with the embed
        if (usr) {
            const embed = new EmbedBuilder() // Creates a new embed
            .setAuthor({name: `${usr.username}'s ID`, iconURL: usr.displayAvatarURL({dynamic: true})}) // Sets the author of the embed to the user's username
            .setDescription(usr.id) // Sets the description of the embed to the id of the user
            .setColor('0x6600ff') // Sets the color of the embed to purple
            .setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}) // This will show who requested the avatar
            .setTimestamp()
        }
	},
};
