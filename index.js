const { Client, GatewayIntentBits, Partials, Collection, REST } = require("discord.js");
const config = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
const Dhandewala = require("./src/dhandewala");

(async () => {
	const intents = [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ];
	const partials = [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction];
	const dhandewala = new Dhandewala({intents: intents, partials: partials, shards: "auto"});

	for (const file of fs.readdirSync("./src/events/").filter(file => file.endsWith(".js"))) {
		console.log(file);
		const event = require(`./src/events/${file}`);
		dhandewala.on(file.split(".")[0], (...args) => event.run(dhandewala, ...args));
	}
	await dhandewala.login(config.token);
})();