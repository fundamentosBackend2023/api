const ordersDB = require('../libs/orders');
const ClientServices = require('./clientServices');

class Orders{
    constructor(){}

    static getAll(){
        return ordersDB;
    }

    static create(orderInfo){
        const { clientId, amount } = orderInfo;
        const orderIndex = Object.keys(ordersDB).length;
        ordersDB[orderIndex] = orderInfo;
        ClientServices.addSpentAmount(clientId, amount);
        return true;
    }


}

module.exports = Orders