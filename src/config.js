module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMIN_IDS: process.env.ADMIN_IDS.split(",").map(id => id.trim()),
  GROUP1: process.env.GROUP_LOG_1,
  GROUP2: process.env.GROUP_LOG_2,
  AI_ENABLED: process.env.AI_ENABLED === "true",
  OPENROUTER_KEY: process.env.OPENROUTER_API_KEY
};
