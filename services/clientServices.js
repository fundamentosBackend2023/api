const clientsDB = require('../libs/client');

class Client {
    constructor(){}

    static getAll(min, max){
        if(!max) max = Infinity;
        if(!min) min = 0;

        const filteredClients = {};

        for(const [id, client] of Object.entries(clientsDB)){
            if(client.spentAmount > min && client.spentAmount < max){
                filteredClients[id] = client;
            }
        }

        return filteredClients;
    }

    static getOne(clientId){
        const retrievedClient = clientsDB[clientId];
        return retrievedClient;
    }

    static create(clientInfo){
        const clientIndex = Object.keys(clientsDB).length;
        clientsDB[clientIndex] = clientInfo;
        return true;
    }

    static updateClient(receivedInfo, clientIndex){
        clientsDB[clientIndex] = receivedInfo;
        return true;
    }

    static addSpentAmount(id, amount){
        clientsDB[id].spentAmount += amount;
    }

    static modifySpentAmount(clientIndex, spentAmount){
        Client.addSpentAmount(clientIndex, spentAmount);
        return clientsDB[clientIndex];
    }

    static deleteClient(clientId){
        const clientToDelete = clientsDB[clientId];
        delete clientsDB[clientId];
        return clientToDelete;
    }

}

module.exports = Client;
