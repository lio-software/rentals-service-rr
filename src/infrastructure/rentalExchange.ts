import * as amqp from 'amqplib';

export const declareOrderExchange = async() => {

    try {
        const connection = await amqp.connect('amqp://127.0.0.1');
        const channel = await connection.createChannel();
        const exchangeName = 'rentals-exchange';
        const exchangeType = 'direct';

        await channel.assertExchange(exchangeName,exchangeType,{durable:false});

    }catch(error) {
        console.log("ERROR: "+error);
    }
}