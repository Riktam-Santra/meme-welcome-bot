const { Client, GuildMember } = require("discord.js");
const ServerBannerGenerator = require("../image_generators/server_banner_generator.js");

module.exports = {
    /**
     * 
     * @param {Client} client
     * @param {GuildMember} member 
     */
    async run(client, member) {
        
        let guild;
        if(client.guilds.cache) {
            guild = client.guilds.cache.get("758245752836325386");
        }
        else {
            guild = await client.guilds.fetch("758245752836325386");
        } 
        let channel = guild.channels.cache.get("1165759162131697674");

        let generator = new ServerBannerGenerator();
        let av_req = await fetch(member.displayAvatarURL());
        let img_buffer = await av_req.arrayBuffer();
        await generator.generate(img_buffer);
        await channel.send({files: [{attachment: "test.png"}]});
    }
};