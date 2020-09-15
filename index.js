const Discord = require('discord.js');
const schedule = require('node-schedule');
const messages = [
  "Armen el among us, culos",
  "Armen el among us, puñetas",
  "Quién vergas es el impostor?",
  "Tiempo de purgar la nave, culeros",
  "Hora de la milonga",
  "No me ignoren, ogts!",
];

if (!process.env.NODE_ENV)
  require('dotenv').config()
  
if(!process.env.DISCORD_BOT_TOKEN && !process.env.CRONTAB_SCHEDULE) {
  console.error("Environment not properly configured!")
  process.exit(0)
}

const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();
app.listen(3000, function() {
  console.log(`Running on ${PORT}`)
});

const client = new Discord.Client();
const botToken = process.env.DISCORD_BOT_TOKEN;
const crontab = process.env.CRONTAB_SCHEDULE;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  let chan = client.channels.cache.find(c => c.type == 'text' && c.name == 'general')
  if(chan){
    schedule.scheduleJob(crontab, function() {
      chan.send(messages[Math.random() * messages.length | 0])
      console.log('message sended!')
    })
  }
})

client
  .login(botToken)
  .catch(e => console.error(e))