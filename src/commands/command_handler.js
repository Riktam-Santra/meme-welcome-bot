
const { Message } = require("discord.js");
const config = require("../../config.json");
const nah_id_win = require("../image_generators/meme_generators/nah_id_win");
const gemini_ai = require("../chatbot/gemini_chat");
module.exports = {
    /**
     * 
     * @param {Message} message 
     */
    async handleCommand(message) {
        if (message.content.startsWith(config.commandPrefix + "a")) {
            let user_1 = message.author;
            let user_2 = message.mentions.members.first();
            if (user_2 == undefined) {
                await message.reply("Mention a user");
                return;
            }
            await nah_id_win.generate(user_1.displayAvatarURL({ extension: 'png' }), user_2.displayAvatarURL({ extension: 'png' }));
            let sent_msg = await message.channel.send("```Generating...```");
            if (sent_msg.editable) {
                await sent_msg.edit({ files: [{ attachment: "output.gif" }] });
                await sent_msg.edit("_ _");
            } else {
                message.reply("Couldn't edit message.")
            }
        } 
        else if (message.content.startsWith(config.commandPrefix + "prompt ")) {
            const newContent = message.content.replace(message.content.startsWith(config.commandPrefix + "prompt"), "");
            let sent_mg = await message.reply("Generating...");
            let prompt_reply = await gemini_ai.run(newContent);
            let messages = prompt_reply.match();
            if(sent_mg.editable){
                if (prompt_reply != "") {
                    await sent_mg.edit(prompt_reply);
                } else {
                    await sent_mg.edit("Unable to process this prompt.");
                }
            } else {
                await message.reply("unable to edit message");
            }
        }
    }
}