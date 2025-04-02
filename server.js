const express = require('express');
const axios = require("axios");
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/searchword', (req, res) => {
    var options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
        params: { entry: req.query.entry },
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,  // Use the variable from Render
            'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }
    };

    axios.request(options).then(response => {
        res.json(response.data);
    }).catch(error => {
        console.error(error);
        res.status(500).json({ error: "Error fetching data" });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
