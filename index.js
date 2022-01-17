// Initialisation --------------------------------------------------------------

const Discord = require("discord.js");
// Import and configure dotenv to obtain the Discord bot token.
require("dotenv").config();
const TOKEN = process.env.TOKEN;

// Create a bot client to access the Discord API.
const client = new Discord.Client({
    // Add intents - things that the Discord bot is going to look out for.
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

// Ready event is triggered when the bot logs in successfully.
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on("messageCreate", (message) => {
    if (message.content == "hi") {
        message.reply("Hello World")
    }
});

client.login(TOKEN);