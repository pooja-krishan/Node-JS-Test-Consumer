const amqp = require('amqplib/callback_api');
const db = require('../models/index');
const orderStorage = db.orderStorage;
const errorLogs = db.errorLogs;
const storeOrder = async (parseMessage) => {
    // console.log(db.orderStorage);
    console.log(parseMessage);
    orderStorage.create(parseMessage).then( (result) => {
        console.log(result);
        console.log({"message":"Order recorded in newly created service"});;
    }).catch((error) => {
        errorLogs.create({error});
        console.log({"error":error});
    });
};

 module.exports = {
     storeOrder
 }