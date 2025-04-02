const express = require('express');
const axios = require("axios");
const path = require('path');
const app = express();

// Use Render's dynamic port or default to 3000
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
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
            'x-rapidapi-key': '2e7fbe950bmshf27f9abe69e57dbp17b54fjsn8fd0dfdd56d8',
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
