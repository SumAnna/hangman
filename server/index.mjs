import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Word endpoint
app.get('/api/word', async (req, res) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: 'Give me one single English noun that is exactly 6 letters long. Just the word.',
            }],
        });

        const word = chatCompletion.choices[0].message.content.trim().toLowerCase();
        res.json({ word });
    } catch (error) {
        console.error('OpenAI error:', error.message);
        res.status(500).json({ error: 'Failed to get word from AI' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API server listening at http://localhost:${PORT}`);
});
