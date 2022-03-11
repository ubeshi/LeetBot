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
        companies, difficulty, name, pattern, premium, url,
      } = response.data[rand];
      const isPremium = premium ? 'Yes' : 'No';
      const companyString = companies.join(', ');
      message.channel.send(`Problem: ${name}\nPattern: ${pattern[0]}\nDifficulty: ${difficulty}\nPremium: ${isPremium}\nUsed by the following companies: ${companyString}`);
      message.channel.send(url);
    }).catch((err) => {
      throw err;
    });
  }
});

leetBot.login(TOKEN);
