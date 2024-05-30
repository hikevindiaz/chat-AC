const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    console.log(`Received message: ${userMessage}`);

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "asst_MQwNENIv3K9dKG8Ak6QfNVxe", // Use your Assistant's model ID
            messages: [{ role: "user", content: userMessage }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        console.log(`Response from OpenAI: ${JSON.stringify(response.data)}`);
        res.json(response.data);
    } catch (error) {
        console.error(`Error with the chat service: ${error}`);
        res.status(500).send('Error with the chat service');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
