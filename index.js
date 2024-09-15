import fetch from 'node-fetch';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.DISCORD_BOT_TOKEN;

const webAppUrl = 'https://script.google.com/macros/s/AKfycbxRtppFiSg7EDVK5uWTJhKFR9lj5Odut5dnrHhLQBQ6lg9T8hVJpRk5YSRneZB45VPdzQ/exec'; // Replace this with your web app URL

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
  // Logging all messages sent in the Discord server
  console.log(`Received message: ${message.content}`);

  // Check for the command
  if (message.content === '!kest') {
    console.log('Processing !kest command'); // Log that the command is being processed

    try {
      // Make a POST request to your Google Apps Script Web App
      const response = await fetch(webAppUrl, { method: 'POST' });
      const result = await response.text();  // Read the response body
      console.log(`Response: ${result}`);  // Log the response

      // Check the response status
      if (response.ok) {
      //  message.channel.send('Spreadsheet list sent to Discord successfully!');
      } else {
        message.channel.send('Failed to update the list.');
      }
    } catch (error) {
      console.error('Error:', error);  // Log any error that occurs
      message.channel.send('Error occurred while updating the list.');
    }
  }
});

// Login to Discord with your bot token
client.login(token);