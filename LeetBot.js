const axios = require('axios');
const { Client } = require('discord.js');

require('dotenv').config();

const { BASE_URL, TOKEN } = process.env;
const leetBot = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });

leetBot.on('message', (message) => {
  if (message.content === 'leet me') {
    axios.get(BASE_URL).then((response) => {
      const responseLength = response.data.length;
      const rand = Math.round(Math.random() * responseLength);
      const { url } = response.data[rand];
      message.channel.send(url);
    }).catch((err) => {
      throw err;
    });
  }
});

leetBot.login(TOKEN);
