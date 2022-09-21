const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); // Require the necessary discord.js classes

module.exports = {
	data: new SlashCommandBuilder() // Creates a new SlashCommand
		.setName('ping') // The name of the command
		.setDescription('Replies with Pong!'), // The description of the command
	async execute(interaction) { // Executes the command
		const embed = new EmbedBuilder() // Creates a new embed
		.setTitle("Pong!") // Sets the title of the embed to Pong!
		.setDescription(`Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.client.ws.ping)}ms`) // Sets the description of the embed to the latency
		.setColor('0x6600ff') // Sets the color of the embed to purple
		.setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}) // This will show who requested the avatar
		.setTimestamp() // Sets the timestamp of the embed
		await interaction.reply({ embeds: [embed] }); // Replies with the embed
	},
};
