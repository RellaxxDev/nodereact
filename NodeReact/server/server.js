const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

app.get('/', (req, res) => {
    res.sendFile('/home/v/vitlsat4/rellaxx-dev/dist/index.html');
});

app.use(express.static('dist'));

app.listen(port, (err) => {
    if (err) {
        console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});