const { EmbedBuilder } = require('discord.js')

module.exports = {
    "logError": async (client, interaction, err) => {
        const channel = await client.channels.fetch("1023869393559617616");
        embed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(err.message)
            .setFooter({text: `Error in ${interaction.channel.name}`})
            .setTimestamp()
            .setColor("0x6600ff")
		channel.send({ embeds: [embed] })
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); // Replies with an error message
    }
};