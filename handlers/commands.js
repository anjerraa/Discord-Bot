const { getFiles } = require("../utils/functions");
const fs = require("fs");

module.exports =  (bot, reload) => {
    const {client} = bot;

    // Go through each of the sub-folder under ./commands.
    fs.readdirSync("./commands/").forEach((category) => {
        let commands = getFiles(`./commands/${category}`, ".js");  
        
        // Access the sub-folder and go through each of the files frpm the
        // sub-folder.
        commands.forEach((f) => {

            // If bot is reloading, delete from the cache.
            if (reload) {
                delete require.cache[require.resolve(`../commands/${category}/${f}`)];
            }
            const command = require(`../commands/${category}/${f}`);
            client.commands.set(command.name, command);
        })
    })

    console.log(`Loaded ${client.commands.size} command(s).`);
}