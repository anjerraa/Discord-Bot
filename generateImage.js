const Canvas = require("canvas");
const Discord = require("discord.js");
const background = "https://bit.ly/3FBzkh1";

// Get the font for the welcome image.
Canvas.registerFont("./fonts/Vividly-Regular.ttf", {family: "Vividly"});

// Size of the background.
const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

// Size and positioning of the user's avatar.
const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {

    // Get the user's username, #ID and avatar.
    let username = member.user.username;
    let discrim = member.user.discriminator;
    let avatarURL = member.user.displayAvatarURL({
        format: "png", 
        dynamic: "false", 
        size: av.size
    });

    // Create a canvas with the background's width and height.
    const canvas = Canvas.createCanvas(dim.width, dim.height);
    // Get the context of the canvas -> an object with properties and methods
    // for rendering graphics inside the canvas.
    const ctx = canvas.getContext("2d");

    // Draw the background image onto the canvas.
    const backgroundImage = await Canvas.loadImage(background);
    // Drawing the background image at (0,0) will fill up the entire canvas
    // with the chosen picture.
    ctx.drawImage(backgroundImage, 0, 0);

    // // Draw a translucent black tinted box.
    // ctx.fillStyle = "rgba(0,0,0,0.5)";
    // ctx.fillRect(dim.margin, dim.margin, dim.width - 2*dim.margin, dim.height - 2*dim.margin);

    // Draw the user's avatar image onto the canvas.
    const avatarImage = await Canvas.loadImage(avatarURL);
    ctx.save();
    // Draw a circle where the user's avatar will be drawn in (essentially cropping).
    ctx.beginPath();
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    // Center the avatar by the left hand corner. 
    ctx.drawImage(avatarImage, av.x, av.y);
    ctx.restore();

    // Write in texts.
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    // Draw in "Welcome".
    ctx.font = "70px 'Vividly'";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.fillText("Welcome", dim.width/2, dim.margin + 90);

    // Draw in user's username.
    ctx.font = "80px 'Vividly'";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin - 115);

    // Draw in "to the server!".
    ctx.font = "60px 'Vividly'";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0, 0, 0, 1)";
    ctx.fillText("to the server!", dim.width/2, dim.height - dim.margin - 50);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
    return attachment;
}

// Export the function so other files are allowed to access it.
module.exports = generateImage;