const { Client, Message } = require("discord.js");

module.exports = {
    name: '',
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    action: async (client, message) => {
        await message.channel.send("pong!");
    }
}