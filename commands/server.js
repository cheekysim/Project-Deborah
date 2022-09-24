const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); // Require the necessary discord.js classes

module.exports = {
    data: new SlashCommandBuilder() // Creates a new SlashCommand
        .setName('server') // The name of the command
        .setDescription('Replies with server info!'), // The description of the command
    async execute(interaction) { // Executes the command
        let owner = await interaction.guild.fetchOwner(); // Fetches the owner of the guild
        const members = await interaction.guild.members.fetch(); // Fetches all members of the guild
        const channels = await interaction.guild.channels.fetch(); // Fetches all channels of the guild
        function verif(val) { // Function to get the verification level
            switch(val) {
                case 0: return "None";
                case 1: return "Low";
                case 2: return "Medium";
                case 3: return "High";
                case 4: return "Highest";
            }
        }
        let bots = members.filter(member => member.user.bot).size; // Gets the amount of bots in the guild
        const embed = new EmbedBuilder() // Creates a new embed
            .setTitle('Server info') // Sets the title of the embed to Server info
            .setAuthor({name: interaction.guild.name.toString(), iconURL: interaction.guild.iconURL({ dynamic: true })}) // Sets the author of the embed to the server
            .addFields( // Adds fields to the embed
                {name: 'ID', value: interaction.guild.id.toString(), inline: true}, // The name of the server
                {name: 'Owner', value: owner.user.toJSON().username, inline: true}, // The owner of the server
                {name: "Verification", value: verif(interaction.guild.verificationLevel), inline: true}, // The verification level of the server
                {name: 'Members', value: interaction.guild.memberCount.toString(), inline: true}, // The amount of members
                {name: "Humans", value: (members.size - bots).toString(), inline: true}, // The amount of humans
                {name: "Bots", value: bots.toString(), inline: true}, // The amount of bots
                {name: 'Channels', value: `${channels.filter(ch => ch.type === 0).size.toString()} Text | ${channels.filter(ch => ch.type === 2).size.toString()} Voice`}, // The amount of text and voice channels
                //{name: 'Created at', value: interaction.guild.createdAt.toDateString().toString(), inline: true}
                ) // When the server was created
            .setColor(0x6600ff) // Sets the color of the embed to purple
            .setThumbnail(interaction.guild.iconURL({ dynamic: true })) // Sets the thumbnail of the embed to the server icon
            .setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}) // This will show who requested the avatar
            .setTimestamp(); // Sets the timestamp of the embed
        await interaction.reply({ embeds: [embed] }); // Replies with the embed
    }
}