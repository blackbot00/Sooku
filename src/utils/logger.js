const bot = require("../bot");
const config = require("../config");

exports.logGroup1 = msg => bot.sendMessage(config.GROUP1, msg);
exports.logGroup2 = msg => bot.sendMessage(config.GROUP2, msg);
