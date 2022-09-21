const { SlashCommandBuilder } = require('discord.js'); // Require the necessary discord.js classes

module.exports = {
	data: new SlashCommandBuilder() // Creates a new SlashCommand
		.setName('echo') // The name of the command
		.setDescription('Replies with your input!') // The description of the command
		.addStringOption(option => option.setName('input').setDescription('The input to echo back').setRequired(true)), // The string option to echo back
	async execute(interaction) { // Executes the command
		await interaction.reply(interaction.options.getString('input')); // Replies with the input
	},
};
