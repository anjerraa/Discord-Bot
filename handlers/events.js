const { getFiles } = require("../utils/functions")

module.exports = (bot, reload) => {
    // {} -> deconstruction: pulls out the `client` variable from the bot object.
    const {client} = bot;
    // Grab our events:
    let events = getFiles("./events/", ".js");

    if (events.length === 0) {
        console.log("No events to load.");
    }

    // If there are existing events, loop:
    events.forEach((f, i) => {

        // If the bot is reloading, first, delete all the loaded information and
        // replace them with the updated ones.
        if (reload) {
            delete require.cache(require.resolve(`../events/${f}`));
        }

        // Pull out the event from the events folder.
        const event = require(`../events/${f}`);
        // Each event object will have a property of .name.
        client.events.set(event.name, event);

        // If the bot is not reloading, print out that we have loaded the event.
        if (!reload) {
            console.log(`${i + 1}. ${f} loaded.`);
        }
    })

    // Only initialise event listeners once to avoid (when bot starts up) to avoid
    // duplicates.
    if (!reload) {
        initEvents(bot);
    }

}

// `...arg` will catch any extra arguments -> some events use 0 or 2+ arguments.
function triggerEventHandler(bot, event, ...arg) {
    
    // Deconstruct the client variable from the bot object.
    const {client} = bot;

    // Try to see if the client has the specified event.
    // If yes, run the event.
    // If no, throw an error.
    try {
        if (client.events.has(event)) {
            client.events.get(event).run(bot, ...arg);
        } else {
            throw new Error(`Event ${event} does not exist.`);
        }
    }

    catch(err) {
        console.error(err);
    }
}

function initEvents(bot) {
    
    // Deconstruct the client variable from the bot object.
    const {client} = bot;

    // Initialise ready event.
    client.on("ready", () => {
        triggerEventHandler(bot, "ready");
    })

    // Initialise message create event.
    client.on("messageCreate", (message) => {
        triggerEventHandler(bot, "messageCreate", message);
    })
}