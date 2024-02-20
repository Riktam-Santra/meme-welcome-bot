
const { Message } = require("discord.js");
const config = require("../../config.json");
const nah_id_win = require("../image_generators/meme_generators/nah_id_win");

module.exports = {
    /**
     * 
     * @param {Message} message 
     */
    async handleCommand(message) {
        if(message.content.startsWith(config.commandPrefix+"a")) {
            let user_1 = message.author;
            let user_2 = message.mentions.members.first();
            if(user_2 == undefined) {
                message.reply("Mention a user")
                return;
            }
            await nah_id_win.generate(user_1.displayAvatarURL({extension: 'png'}), user_2.displayAvatarURL({extension: 'png'}));
            await message.channel.send({files: [{attachment: "output.gif"}]});
        }
    }
}