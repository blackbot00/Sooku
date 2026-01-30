exports.mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "👤 Human Chat", callback_data: "human" }],
      [{ text: "🤖 AI Chat", callback_data: "ai" }]
    ]
  }
};

exports.backMenu = {
  reply_markup: {
    inline_keyboard: [[{ text: "⬅️ Back", callback_data: "back" }]]
  }
};
