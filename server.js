const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ⚡ Your OpenAI API Key
const OPENAI_API_KEY = "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";

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ reply: "⚠️ Error connecting to AI." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Lar-Ai server running on port ${PORT}`);
});
