const express = require('express');
const app = express();
const { globalMw, globalMw2, gmw, rootMw, exclusiveRootMw, mwClosure } = require('./utils/middlewares/sample');
const { printErrorHanlder, boomErrorHandler, generalErrorHandler } = require('./utils/middlewares/errorHandlers');
const config = require('./config/config');
const linkRouters = require('./routes');

app.use(express.json());
app.use(globalMw2)
app.use(globalMw);
app.use('/greeting', gmw);
app.use('/', rootMw);

const port = config.port;

app.get('/',
    exclusiveRootMw,
    mwClosure('Fernando', 'red'),
    (req, res) => {
        res.send('Hello from server');
    }
);

app.get('/greeting', (req, res) => {
    res.status(200).json({'message': 'message in json from server'});
});

app.get('/greeting2', (req, res) => {
    res.status(200).json({'message': 'second message in json from server'});
});

linkRouters(app);

app.use(printErrorHanlder);
app.use(boomErrorHandler);
app.use(generalErrorHandler);

app.listen(port, () => {
    console.log('Server listening on port', port);
});