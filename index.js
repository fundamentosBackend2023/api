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

app.use(express.json());
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

//! Clients API

const clientsDB = {}

app.get('/clients', (req, res) => {
    res.status(200).json({
        clients: clientsDB,
        message: 'Client list'
    });
});

app.get('/clients/:id', (req, res) => {
    const clientIndex = req.params.id;
    const retrievedClient = clientsDB[clientIndex];
    res.status(200).json({
        message: 'Here is your client',
        client: retrievedClient
    })
});

app.post('/clients', (req, res) =>{
    const receivedInfo = req.body;
    const clientIndex = Object.keys(clientsDB).length;
    clientsDB[clientIndex] = receivedInfo;
    res.status(201).json({
        message: 'client successfully created'
    });
});

app.put('/clients/:id', (req, res) => {
    const receivedInfo = req.body;
    const { id: clientIndex } = req.params;
    clientsDB[clientIndex] = receivedInfo;
    res.status(200).json({
        message: 'client updated'
    });
});

const addSpentAmount = (id, amount) => {
    clientsDB[id].spentAmount += amount;
}

app.patch('/clients/addSpentAmount/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const { spentAmount } = req.body;
    addSpentAmount(clientIndex, spentAmount);
    res.status(200).json({
        message: 'client updated',
        updatedClient: clientsDB[clientIndex]
    });
});

app.delete('/clients/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const clientToDelete = clientsDB[clientIndex];
    delete clientsDB[clientIndex];
    res.status(200).json({
        message: 'Client deleted',
        deletedClient: clientToDelete
    });
});

//! Orders API

const ordersDB = {}

app.get('/orders', (req, res) => {
    res.status(200).json({
        message: 'Orders list',
        orders: ordersDB
    });
});

app.post('/orders', (req, res) => {
    const receivedOrder = req.body;
    const { clientId, amount } = req.body;
    const orderIndex = Object.keys(ordersDB).length;
    ordersDB[orderIndex] = receivedOrder;
    addSpentAmount(clientId, amount);
    res.status(201).json({
        message: 'order successfully registered'
    });
});


app.listen(port, () => {
    console.log('Server listening on port', port);
});