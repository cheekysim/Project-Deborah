const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); // Require the necessary discord.js classes
const mysql = require('mysql')
const { DBPASS } = require('dotenv').config().parsed;

module.exports = {
	data: new SlashCommandBuilder() // Creates a new SlashCommand
		.setName('database') // The name of the command
		.setDescription('Shows Database!'), // The description of the command
	async execute(interaction) { // Executes the command
        const con = mysql.createConnection({
            host: "192.168.1.222",
            user: "root",
            password: DBPASS
        })
		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
		});
		const embed = new EmbedBuilder() // Creates a new embed
		.setTitle("Database!") // Sets the title of the embed to Database
		.setDescription('TBD') // Sets the description of the embed to TBD
		.setColor('0x6600ff') // Sets the color of the embed to purple
		.setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})}) // This will show who requested the avatar
		.setTimestamp() // Sets the timestamp of the embed
		await interaction.reply({ embeds: [embed] }); // Replies with the embed
	},
};
