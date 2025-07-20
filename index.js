const express = require('express');
const app = express();

const port = 3003;

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.get('/greeting', (req, res) => {
    res.status(200).json({'message': 'message in json from server'});
});

app.listen(port, () => {
    console.log('Server listening on port', port);
});