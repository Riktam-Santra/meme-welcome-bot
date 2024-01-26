const { Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require('fs');
const config = require('./config.json');

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
	const client = new Client({intents: intents, partials: partials, shards: "auto"});

	for (const file of fs.readdirSync("./src/events/").filter(file => file.endsWith(".js"))) {
		console.log(file);
		const event = require(`./src/events/${file}`);
		client.on(file.split(".")[0], (...args) => event.run(...args));
	}

	await client.login(config.token);
})();