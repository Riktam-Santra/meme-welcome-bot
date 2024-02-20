const { generate } = require("./src/image_generators/nah_id_win/generator");

(async () => {
    await generate("./resources/server_icon.jpg","./resources/server_icon.jpg");
})();