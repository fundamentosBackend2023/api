const express = require('express');
const app = express();

const globalMw = (req, res, next) => {
    console.log('Hello from globla mw');
    next();
}

const globalMw2 = (req, res, next) => {
    console.log('Hello from second globla mw');
    next();
}

const rootMw = (req, res, next) => {
    console.log('Hello from root mw');
    next();
}

const gmw = (req, res, next) => {
    console.log('Hello from greeting mw');
    next();
}

const exclusiveRootMw = (req, res, next) => {
    console.log('hello from exclusive');
    next();
}

const mwClosure = (firstName, favoriteColor) => {
    return (req, res, next) => {
        console.log('Hello', firstName, 'your favorite color is', favoriteColor);
        next();
    }
}

app.use(globalMw2)
app.use(globalMw);
app.use('/greeting', gmw);
app.use('/', rootMw);


const port = process.env.PORT;

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

app.listen(port, () => {
    console.log('Server listening on port', port);
});