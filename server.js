
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static('frontend'));

app.post('/ask', async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7
            })
        });

        const result = await response.json();
        res.json({ response: result.choices?.[0]?.message?.content || 'رد غير واضح من DeepSeek' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'فيه مشكلة بالسيرفر 😓' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
