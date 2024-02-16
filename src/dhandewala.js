const { Client, Collection } = require("discord.js");

class Dhandewala extends Client{
    constructor(config) {
        super(config);
        this.commands = new Collection();
    }
}

module.exports = Dhandewala