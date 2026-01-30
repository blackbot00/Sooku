const bot = require("../bot");
const fetch = require("node-fetch");
const User = require("../models/User");
const config = require("../config");
const { blockedWords } = require("../utils/filters");
const { logGroup2 } = require("../utils/logger");

let aiUsers = new Set();

bot.on("callback_query", async q => {
  if (q.data !== "ai") return;
  if (!config.AI_ENABLED)
    return bot.answerCallbackQuery(q.id, { text: "🚫 AI chat disabled" });

  aiUsers.add(q.message.chat.id);
  bot.sendMessage(q.message.chat.id, "🤖 AI Chat started. Type /exit to stop.");
});

bot.on("message", async msg => {
  const chatId = msg.chat.id;
  if (!aiUsers.has(chatId) || msg.text?.startsWith("/")) return;

  const user = await User.findOne({ userId: chatId });
  if (!user) return;

  if (!user.premium && user.aiCountToday >= 40)
    return bot.sendMessage(chatId, "❌ Daily AI limit reached.");

  if (blockedWords.some(w => msg.text.toLowerCase().includes(w)))
    return bot.sendMessage(chatId, "🙏 Safety reason – not allowed.");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${config.OPENROUTER_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openchat/openchat-3.5",
      messages: [{ role: "user", content: msg.text }]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "🙂";

  user.aiCountToday++;
  await user.save();

  bot.sendMessage(chatId, reply);
  logGroup2(`👤 ${user.name} ↔ 🤖 AI\n${msg.text}\nAI: ${reply}`);
});

bot.onText(/\/exit/, msg => {
  aiUsers.delete(msg.chat.id);
  bot.sendMessage(msg.chat.id, "🔚 Chat ended.\nUse /start again.");
});
