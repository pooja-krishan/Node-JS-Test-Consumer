const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded( {extended:true} ))
const cors = require('cors');
var corsOptions = {
    origin: "https://localhost:8081"
}

app.use(cors(corsOptions));

// app.get('/', (req,res) => {
//     res.json({message : "Hello!!!!"})
// });

const orderStore = require('./controllers/orderStore');
const PORT = process.env.PORT || 8081;
const amqp = require('amqplib/callback_api');
const QUEUE = "orders_queue";
module.exports = amqp.connect('amqp://localhost:5672',(err,connection) => {
    console.log(connection);
    if(err) {
        throw err;
    }
    connection.createChannel((err,channel) => {
        if(err) {
            throw err;
        }
        channel.assertQueue(QUEUE,{
            durable : true
        });
        channel.consume(QUEUE,(message) => {
            console.log(message);
            setTimeout(function() {
                const parseMessage = JSON.parse(Buffer.from(message.content));
                console.log(`Message received: ${parseMessage}`);
                console.log(parseMessage);
                orderStore.storeOrder(parseMessage);
                channel.ack(message);
            },8000);
        },{noAck : false});
    });
});

//Run server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});