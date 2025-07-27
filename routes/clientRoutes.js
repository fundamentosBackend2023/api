const express = require('express');
const router = express.Router();
const ClientServices = require('../services/clientServices');

router.get('/', (req, res) => {
    const clients = ClientServices.getAll();
    res.status(200).json({
        clients: clients,
        message: 'Client list'
    });
});

router.get('/:id', (req, res) => {
    const clientIndex = req.params.id;
    const retrievedClient = ClientServices.getOne(clientIndex);
    res.status(200).json({
        message: 'Here is your client',
        client: retrievedClient
    })
});

router.post('/', (req, res) =>{
    const receivedInfo = req.body;
    ClientServices.create(receivedInfo);
    res.status(201).json({
        message: 'client successfully created'
    });
});

router.put('/:id', (req, res) => {
    const receivedInfo = req.body;
    const { id: clientIndex } = req.params;
    ClientServices.updateClient(receivedInfo, clientIndex);
    res.status(200).json({
        message: 'client updated'
    });
});


router.patch('/addSpentAmount/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const { spentAmount } = req.body;
    const modifiedClient = ClientServices.modifySpentAmount(clientIndex, spentAmount)
    res.status(200).json({
        message: 'client updated',
        updatedClient: modifiedClient
    });
});

router.delete('/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const clientToDelete = ClientServices.deleteClient(clientIndex);
    res.status(200).json({
        message: 'Client deleted',
        deletedClient: clientToDelete
    });
});

module.exports = router;