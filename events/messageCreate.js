const Discord = require("discord.js");

module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot;

        // If message was not sent in the guild/server.
        if (!message.guild) return;
        // If message was sent from a bot.
        if (message.author.bot) return;
        // If message doesn't start with the specified prefix used by bot.
        if (!message.content.startsWith(prefix));

        // Split message into arguments and see if the command exists.
        // Remove the bot command prefix with slice(prefix.length).
        // Remove spaces before and after with trim().
        // Put the rest of the commands (split by space) into an array with split(/ +/g).
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        // Get the bot command from the args array by removing it.
        // toLowerCase() is used in the case of the user capitalised the command.
        const cmdstr = args.shift().toLowerCase();

        // Get the command to check if command is valid.
        let command = client.commands.get(cmdstr);
        if (!command) {
            return message.reply("Invalid command!");
        }

        // If command is only available for bot owners but the user isn't one.
        if (command.devOnly && !owners.includes(member.id)) {
            return message.reply("This command is only available for the bot owners.");
        }

        // If user does not have the required permission (if any).
        if (command.permission && member.permissions.missing(command.permissions) != 0) {
            return message.reply("You do not have permission to use this command! :(");
        }

        try {
            await command.run({...bot, message, args})
        }

        catch (err) {
            let errMsg = err.toString();

            // Error messages that starts with "?" are triggered by the user manually.
            if (errMsg.startsWith("?")) {
                // Remove the question mark.
                errMsg = errMsg.slice(1);
                await message.reply(errMsg);
            } else {
                // Else, it was not an error on the user's end.
                console.error(err);
            }
        }
    }
}