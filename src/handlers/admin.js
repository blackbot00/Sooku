const bot = require("../bot");
const config = require("../config");
const User = require("../models/User");

const isAdmin = id => config.ADMIN_IDS.includes(String(id));

bot.onText(/\/ai_off/, msg => {
  if (!isAdmin(msg.from.id)) return bot.sendMessage(msg.chat.id, "🚫 Admin only");
  process.env.AI_ENABLED = "false";
  bot.sendMessage(msg.chat.id, "❌ AI Disabled");
});

bot.onText(/\/ai_on/, msg => {
  if (!isAdmin(msg.from.id)) return bot.sendMessage(msg.chat.id, "🚫 Admin only");
  process.env.AI_ENABLED = "true";
  bot.sendMessage(msg.chat.id, "✅ AI Enabled");
});

bot.onText(/\/ban (\d+)/, async (msg, m) => {
  if (!isAdmin(msg.from.id)) return;
  await User.updateOne({ userId: m[1] }, { banned: true });
  bot.sendMessage(msg.chat.id, `🚫 User ${m[1]} banned`);
});
