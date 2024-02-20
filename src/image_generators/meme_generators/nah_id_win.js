const { loadImage, Canvas } = require('canvas');
const fs = require('fs');
const canvasGif = require('canvas-gif')
module.exports = {
    async generate(avatar_1_url, avatar_2_url) {
        const av1_canvas = new Canvas(150, 150);
        const av2_canvas = new Canvas(150, 150);

        const ctx_av1 = av1_canvas.getContext("2d");
        const ctx_av2 = av2_canvas.getContext("2d");

        const av_1 = await loadImage(avatar_1_url);
        const av_2 = await loadImage(avatar_2_url);

        const canvas = await canvasGif("./resources/memes/gojo_backshots.gif",
            (ctx, width, height, totalFrames, currentFrame) => {

                ctx_av1.beginPath();
                ctx_av1.arc(75, 75, 75, 0, Math.PI * 2, true);
                ctx_av1.closePath();
                ctx_av1.clip();
                ctx_av1.drawImage(av_1, 0, 0, 150, 150);
                ctx_av1.restore();
                ctx_av1.save();

                ctx.drawImage(av1_canvas, width - 320, height - 380, 150, 150);
                
                ctx_av2.beginPath();
                ctx_av2.arc(75, 75, 75, 0, Math.PI * 2, true);
                ctx_av2.closePath();
                ctx_av2.clip();
                ctx_av2.drawImage(av_2, 0, 0, 150, 150);
                ctx_av2.restore();
                ctx_av2.save();

                ctx.drawImage(av2_canvas, width - 320, height - 125, 150, 150);
                
                ctx.save();
            },
            {
                //coalesce: true, // whether the gif should be coalesced first (requires graphicsmagick), default: false
                delay: 0, // the delay between each frame in ms, default: 0
                repeat: 0, // how many times the GIF should repeat, default: 0 (runs forever)
                algorithm: 'octree', // the algorithm the encoder should use, default: 'neuquant',
                // optimiser: true, // whether the encoder should use the in-built optimiser, default: false,
                fps: 60, // the amount of frames to render per second, default: 60
                quality: 100, // the quality of the gif, a value between 1 and 100, default: 100
            }
        );
        fs.writeFileSync('output.gif', canvas);
    }
}