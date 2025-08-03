const express = require('express');
const router = express.Router();
const ClientServices = require('../services/clientServices');

router.get('/', async (req, res, next) => {
    try {
        const min = req.query.min;
        const max = req.query.max;

        const clients = await ClientServices.getAll(min, max);
        res.status(200).json({
            clients: clients,
            message: 'Client list'
        });
    }catch(error){
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const clientIndex = req.params.id;
        const retrievedClient = await ClientServices.getOne(clientIndex);
        res.status(200).json({
            message: 'Here is your client',
            client: retrievedClient
        })
    }catch(error){
        next(error);
    }
});

router.post('/', async (req, res, next) =>{
    try{
        const receivedInfo = req.body;
        await ClientServices.create(receivedInfo);
        res.status(201).json({
            message: 'client successfully created'
        });
    }catch(error){
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        const receivedInfo = req.body;
        const { id: clientIndex } = req.params;
        await ClientServices.updateClient(receivedInfo, clientIndex);
        res.status(200).json({
            message: 'client updated'
        });
    }catch(error){
        next(error);
    }
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

router.delete('/:id', async (req, res, next) => {
    try{
        const { id: clientIndex } = req.params;
        const clientToDelete = await ClientServices.deleteClient(clientIndex);
        res.status(200).json({
            message: 'Client deleted',
            deletedClient: clientToDelete
        });
    }catch(error){
        next(error);
    }
});

module.exports = router;