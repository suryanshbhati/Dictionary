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
        console.log("Using API Key:", process.env.RAPIDAPI_KEY); // Debugging API key

        if (!req.query.entry) {
            return res.status(400).json({ error: "Missing 'entry' query parameter" });
        }

        const options = {
            method: 'GET',
            url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
            params: { entry: req.query.entry },
            headers: {
                'x-rapidapi-key': '2e7fbe950bmshf27f9abe69e57dbp17b54fjsn8fd0dfdd56d8',
                'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
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
