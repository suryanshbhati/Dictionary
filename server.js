const express = require('express');
const axios = require("axios");
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    return res.sendFile('public/index.html' , {root : __dirname});
});

app.get('/searchword', (req, res) => {
    //res.send('Hello World! Surya');
    //console.log(req.query);
    var options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
        params: { entry: req.query.entry },
        headers: {
            'x-rapidapi-key': '2e7fbe950bmshf27f9abe69e57dbp17b54fjsn8fd0dfdd56d8',
            'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    // let response = {}
    // response.data = {
    //     entry: 'Autonomous',
    //     request: 'autonomous',
    //     response: 'autonomous',
    //     theme: [
    //       'free',    'individual',
    //       'each',    'country',
    //       'foreign', 'symbol',
    //       'village', 'local',
    //       'town'
    //     ],
    //     version: '7.5.7',
    //     author: 'twinword inc.',
    //     email: 'help@twinword.com',
    //     result_code: '200',
    //     result_msg: 'Success'
    // }
    // console.log(response.data);
    // res.json(response.data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port} - http://localhost:3000`);
});