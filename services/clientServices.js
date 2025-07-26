const clientsDB = require('../libs/client');

class Client {
    constructor(){}

    static getAll(){
        return clientsDB;
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
