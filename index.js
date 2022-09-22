// Require environment variables
const { CLIENTID, GUILDID, TOKEN } = require('dotenv').config().parsed;

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

// Create a new collection of commands
client.commands = new Collection();

// Loads all slash commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Listens for interactions
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return; // Checks if the interaction is a slash command

	const command = interaction.client.commands.get(interaction.commandName); // Gets the command

	if (!command) return; // If the command doesn't exist, return

	try {
		await command.execute(interaction); // Executes the command
	} catch (error) {
		console.error(error); // Logs the error
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); // Replies with an error message
	}
});

// Login to Discord with your client's token
client.login(TOKEN);