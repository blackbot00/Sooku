const bot = require("../bot");
const User = require("../models/User");
const { logGroup1 } = require("../utils/logger");

bot.on("callback_query", async q => {
  const chatId = q.message.chat.id;
  const data = q.data;
  const user = await User.findOne({ userId: chatId });

  if (!user || user.registered) return;

  if (data.startsWith("state_")) {
    user.state = data.split("_")[1];
    await user.save();
    return bot.editMessageText("👤 Select Gender:", {
      chat_id: chatId,
      message_id: q.message.message_id,
      reply_markup: {
        inline_keyboard: [
          [{ text: "Male", callback_data: "gender_male" }],
          [{ text: "Female", callback_data: "gender_female" }],
          [{ text: "Transgender", callback_data: "gender_trans" }]
        ]
      }
    });
  }

  if (data.startsWith("gender_")) {
    user.gender = data.split("_")[1];
    await user.save();
    return bot.editMessageText("🎂 Select Age:", {
      chat_id: chatId,
      message_id: q.message.message_id,
      reply_markup: {
        inline_keyboard: [
          [{ text: "18", callback_data: "age_18" }, { text: "19", callback_data: "age_19" }, { text: "20", callback_data: "age_20" }],
          [{ text: "21", callback_data: "age_21" }, { text: "22", callback_data: "age_22" }, { text: "23", callback_data: "age_23" }]
        ]
      }
    });
  }

  if (data.startsWith("age_")) {
    user.age = Number(data.split("_")[1]);
    user.registered = true;
    await user.save();

    logGroup1(`✅ Registration Completed\n👤 ${user.name} (${chatId})`);
    return bot.editMessageText("✅ Registration completed!\n\nUse /start to chat 💕", {
      chat_id: chatId,
      message_id: q.message.message_id
    });
  }
});
