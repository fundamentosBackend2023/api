const express = require('express');
const app = express();

const ClientServices = require('./services/clientServices');
const OrderServices = require('./services/orderServices');

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

app.get('/clients', (req, res) => {
    const clients = ClientServices.getAll();
    res.status(200).json({
        clients: clients,
        message: 'Client list'
    });
});

app.get('/clients/:id', (req, res) => {
    const clientIndex = req.params.id;
    const retrievedClient = ClientServices.getOne(clientIndex);
    res.status(200).json({
        message: 'Here is your client',
        client: retrievedClient
    })
});

app.post('/clients', (req, res) =>{
    const receivedInfo = req.body;
    ClientServices.create(receivedInfo);
    res.status(201).json({
        message: 'client successfully created'
    });
});

app.put('/clients/:id', (req, res) => {
    const receivedInfo = req.body;
    const { id: clientIndex } = req.params;
    ClientServices.updateClient(receivedInfo, clientIndex);
    res.status(200).json({
        message: 'client updated'
    });
});


app.patch('/clients/addSpentAmount/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const { spentAmount } = req.body;
    const modifiedClient = ClientServices.modifySpentAmount(clientIndex, spentAmount)
    res.status(200).json({
        message: 'client updated',
        updatedClient: modifiedClient
    });
});

app.delete('/clients/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const clientToDelete = ClientServices.deleteClient(clientIndex);
    res.status(200).json({
        message: 'Client deleted',
        deletedClient: clientToDelete
    });
});

//! Orders API



app.get('/orders', (req, res) => {
    const orders = OrderServices.getAll();
    res.status(200).json({
        message: 'Orders list',
        orders: orders
    });
});

app.post('/orders', (req, res) => {
    const receivedOrder = req.body;
    OrderServices.create(receivedOrder)
    res.status(201).json({
        message: 'order successfully registered'
    });
});


app.listen(port, () => {
    console.log('Server listening on port', port);
});