module.exports = {
    name: "ping",
    category: "info",
    // Permissions that the user needs to run this command. 
    permissions: [],
    // If true, only the users with the IDs in the owner list in index.js
    // can run the command;
    // If false, anyone can run the command.
    devOnly: false,
    run: async ({client, message, args}) => {
        message.reply("Pong");
    }
}