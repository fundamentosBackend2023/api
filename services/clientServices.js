const clientsDB = require('../libs/client');
const boom = require('@hapi/boom');
class Client {
    constructor(){}

    static async getAll(min, max){
        if(!max) max = Infinity;
        if(!min) min = 0;

        const filteredClients = await clientsDB.find().where('spentAmount').gte(min).where('spentAmount').lte(max);

        return filteredClients;
    }

    static async getOne(clientId){
        const retrievedClient = await clientsDB.findById(clientId);
        if(!retrievedClient){
            throw boom.notFound('client not found :(');
        }
        return retrievedClient;
    }

    static async create(clientInfo){
        const client = new clientsDB(clientInfo);
        await client.save();
        return true;
    }

    static async updateClient(receivedInfo, clientIndex){
        const clientToUpdate = await this.getOne(clientIndex);
        clientToUpdate.overwrite(receivedInfo);
        await clientToUpdate.save()
        return true;
    }

    static addSpentAmount(id, amount){
        clientsDB[id].spentAmount += amount;
    }

    static modifySpentAmount(clientIndex, spentAmount){
        Client.addSpentAmount(clientIndex, spentAmount);
        return clientsDB[clientIndex];
    }

    static async deleteClient(clientId){
        const clientToDelete = await this.getOne(clientIndex);
        await clientsDB.findByIdAndDelete(clientId);
        return clientToDelete;
    }

}

module.exports = Client;
