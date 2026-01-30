const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
module.exports = bot;

require("./handlers/start");
require("./handlers/registration");
require("./handlers/menu");
require("./handlers/aiChat");
require("./handlers/humanChat");
require("./handlers/admin");
