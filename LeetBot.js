const axios = require('axios');
const { Client } = require('discord.js');

require('dotenv').config();

const { BASE_URL, TOKEN } = process.env;
const leetBot = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

leetBot.on('message', (message) => {
  if (message.content === '!leetme') {
    axios.get(BASE_URL).then((response) => {
      const rand = Math.floor(Math.random() * response.data.length);
      const {
        name, pattern, difficulty, companies, url,
      } = response.data[rand];
      const companyString = companies.join(', ');
      message.channel.send(`Problem: ${name}\nPattern: ${pattern[0]}\nDifficulty: ${difficulty}\nUsed by the following companies: ${companyString}\n${url}`);
    }).catch((err) => {
      throw err;
    });
  }
});

leetBot.login(TOKEN);
