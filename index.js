const express = require("express");
const app = express();
const fetch = require("node-fetch");
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("🔥 himnix is running!");
});

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  const apiKey = process.env.DEEPSEEK_API_KEY;

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  res.json(data);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
