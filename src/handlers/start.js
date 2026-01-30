const bot = require("../bot");
const User = require("../models/User");
const { mainMenu } = require("../utils/keyboards");
const { logGroup1 } = require("../utils/logger");

bot.onText(/\/start/, async msg => {
  const chatId = msg.chat.id;

  let user = await User.findOne({ userId: chatId });
  if (!user) {
    user = await User.create({
      userId: chatId,
      name: msg.from.first_name,
      username: msg.from.username
    });
    logGroup1(`🆕 First Start\n👤 ${msg.from.first_name} (${chatId})`);
  }

  if (!user.registered) {
    return bot.sendMessage(chatId, "📍 Select your State:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Tamil Nadu", callback_data: "state_TN" }],
          [{ text: "Kerala", callback_data: "state_KL" }],
          [{ text: "Karnataka", callback_data: "state_KA" }]
        ]
      }
    });
  }

  bot.sendMessage(chatId, "💬 Who do you want to chat with?", mainMenu);
});
