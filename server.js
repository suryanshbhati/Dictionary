const express = require('express');
const axios = require("axios");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/searchword', async (req, res) => {
    try {
        if (!req.query.entry) {
            return res.status(400).json({ error: "Missing 'entry' query parameter" });
        }

        const options = {
            method: 'GET',
            url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
            params: { entry: req.query.entry },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Secure API Key
                'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);

        if (!response.data || Object.keys(response.data).length === 0) {
            return res.status(404).json({ error: "No data found for this word" });
        }

        res.json(response.data);
    } catch (error) {
        console.error("API Request Error:", error.message);

        if (error.response) {
            res.status(error.response.status).json({
                error: "API Error",
                status: error.response.status,
                message: error.response.data
            });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
