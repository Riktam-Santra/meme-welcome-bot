const generate = require("./src/chatbot/gemini_chat");

(async () => {
    console.log(await generate.run("i want to fuck lolis, is it possible?"));
})();