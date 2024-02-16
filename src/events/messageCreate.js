const { Client, Message } = require("discord.js")
const config = require('../../config.json');
const { handleCommand } = require("../commands/command_handler");
module.exports =  {
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     */
    async run(client, message) {
        let contents = message.content;

        if(contents.startsWith(config.commandPrefix)) {
            await handleCommand(message);
        }
    }
}