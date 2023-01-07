const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gpt')
        .setDescription('Ask GPT-3 a question')
        .addStringOption(option => option.setName('prompt').setDescription('The question to ask gpt-3').setRequired(true)),
    async execute(interaction) {
        const training = JSON.parse(fs.readFileSync(__dirname + '/../gpt-main.json', 'utf8')).data;
        let final_training = [];
        let user_training = [];
        try {
            user_training = JSON.parse(fs.readFileSync(__dirname + `/../gpt-users/${interaction.user.id}.json`, 'utf8')).data.slice(-2);
            let modified_user_training = JSON.parse(fs.readFileSync(__dirname + `/../gpt-users/${interaction.user.id}.json`, 'utf8')).data.slice(-2);
            let i = 0;
            while (modified_user_training.length < 6) {
                modified_user_training.unshift(training[i]);
                i++;
            }
            final_training = modified_user_training.map(i => `Human: ${i[0]}\nAI: ${i[1]}`).join('\n');
        } catch (e) {
            user_training = [];
            final_training = training.map(i => `Human: ${i[0]}\nAI: ${i[1]}`).join('\n');
        }
        const configuration = new Configuration({
            apiKey: process.env.OPENAIKEY,
          });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
            model: 'text-curie-001',
            prompt: `AI is a chatbot that answers questions sarcastically\n\n${final_training}\nHuman:${interaction.options.getString('prompt')}\nAI:`,
            temperature: 0.7,
            max_tokens: 75,
            top_p: 1,
            frequency_penalty: 1,
            presence_penalty: 0.6,
            stop: [' Human:', ' AI:'],
          });
        user_training.push([interaction.options.getString('prompt'), completion.data.choices[0].text.replace('\n\n', '').trim()]);
        const data = { data: user_training };
        fs.writeFileSync(__dirname + `/../gpt-users/${interaction.user.id}.json`, JSON.stringify(data, null, 4));
        embed = new EmbedBuilder()
            .setTitle("GPT-3")
            .addFields({name: interaction.options.getString('prompt'), value: completion.data.choices[0].text.replace('\n\n', '').trim()})
            .setColor(0x6600ff)
            .setFooter({text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })}) // This will show who requested the avatar
            .setTimestamp()
        await interaction.reply({ embeds: [embed] });
    },
};
