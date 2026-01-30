const http = require("http");

const PORT = process.env.PORT || 8000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot is running 🚀");
}).listen(PORT, () => {
  console.log("🌐 Dummy web server running on port", PORT);
});
