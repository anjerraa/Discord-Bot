// Initialisation --------------------------------------------------------------

const Discord = require("discord.js");
// Import and configure dotenv to obtain the Discord bot token.
require("dotenv").config();
const TOKEN = process.env.TOKEN;

// Import the generateImage function from generateImage.js.
const generateImage = require("./generateImage");

// Create a bot client to access the Discord API.
const client = new Discord.Client({
    // Add intents - things that the Discord bot is going to look out for.
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
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

// Event: member joins server -> send a welcome message ------------------------

// ID of the channel where the bot will send the welcome message.
const welcomeChannelId = "932579759492304907"

client.on("guildMemberAdd", async (member) => {
    const welcomeImage = await generateImage(member);
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [welcomeImage]
    });
});

client.login(TOKEN);