// Require the necessary classes
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { CLIENTID, GUILDID, TOKEN } = require('dotenv').config().parsed;

// Gets the commands
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

// Creates a new REST instance
const rest = new REST({ version: '10' }).setToken(TOKEN);

// Deletes the guild commands
rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// Deploys the commands
rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);