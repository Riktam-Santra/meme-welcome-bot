const { Canvas, ImageData, loadImage } = require("canvas");
const { GuildMember } = require("discord.js");
const fs = require('fs');

class ServerBannerGenerator {
    constructor() {
        this.canvas = new Canvas(1114, 631);
        this.av1_canvas = new Canvas(250,250);
        this.av2_canvas = new Canvas(250,250);
    }

    /**
     * 
     * @param {GuildMember} member 
     */
    async generate(member) {
        let ctx = this.canvas.getContext("2d");
        let ctx_av1 = this.av1_canvas.getContext("2d");
        let ctx_av2 = this.av2_canvas.getContext("2d");

        const img = await loadImage("./resources/server_banner.png");
        const av_1 = await loadImage(member.displayAvatarURL({extension: 'png'}));
        const av_2 = await loadImage("./resources/server_icon.jpg");

        ctx.drawImage(img, 0, 0, 1114, 631);

        ctx_av1.beginPath();
        ctx_av1.arc(125, 125, 125, 0, Math.PI * 2, true);
        ctx_av1.closePath();
        ctx_av1.clip();
        ctx_av1.drawImage(av_1, 0, 0, 250, 250);
        ctx_av1.restore();

        ctx_av1.beginPath();
        const p1 = ctx_av1.getImageData(this.getRandomInt(0, 250), this.getRandomInt(0, 250), 250, 250).data;
        var hex = "#" + ("000000" + this.rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
        ctx_av1.strokeStyle = hex;
        ctx_av1.lineWidth = 10;
        ctx_av1.arc(125, 125, 123, 0, Math.PI * 2, true);
        ctx_av1.stroke();
        ctx_av1.closePath();
        ctx_av1.restore

        ctx.drawImage(this.av1_canvas, 10, 75, 250, 250);

        ctx_av2.beginPath();
        ctx_av2.arc(125, 125, 125, 0, Math.PI * 2, true);
        ctx_av2.closePath();
        ctx_av2.clip();
        ctx_av2.drawImage(av_2, 0, 0, 250, 250);
        ctx_av2.restore();

        ctx_av2.beginPath();
        const p2 = ctx_av2.getImageData(this.getRandomInt(0, 250), this.getRandomInt(0, 250), 250, 250).data;
        var hex = "#" + ("000000" + this.rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
        ctx_av2.strokeStyle = hex;
        ctx_av2.lineWidth = 10;
        ctx_av2.arc(125, 125, 123, 0, Math.PI * 2, true);
        ctx_av2.stroke();
        ctx_av2.closePath();
        ctx_av2.restore();

        ctx.drawImage(this.av2_canvas,  850, 150, 250, 250);
        ctx.fillStyle = "white"

        ctx.font = "60px Arial"
        
        ctx.fillText("WELCOME TO", 350, 200)
        ctx.fillText("Shushant X Buddy", 300, 275)
        ctx.textAlign = "center"
        ctx.font = "75px Arial"
        let measure = ctx.measureText(member.displayName)
        ctx.fillText(member.displayName, 350 + (measure.width/2), 500)
        

        ctx.save()
        const buffer2 = this.canvas.toBuffer();

        fs.writeFile('test.png', buffer2, function (e) { console.log(e); });
    }

    rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = ServerBannerGenerator;