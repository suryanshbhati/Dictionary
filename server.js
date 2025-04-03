const express = require('express');
const axios = require("axios");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/searchword', async (req, res) => {
    console.log("RAPIDAPI_KEY from env:", process.env.RAPIDAPI_KEY); // Debugging
    console.log("port:", process.env.PORT);

    try {
        if (!req.query.entry) {
            return res.status(400).json({ error: "Missing 'entry' query parameter" });
        }

        const options = {
            method: 'GET',
            url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
            params: { entry: req.query.entry },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY, // Using env variable
                'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        console.error("API Request Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
