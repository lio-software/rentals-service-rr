import amqp from 'amqplib';
import { RabbitMQService } from '@src/application/services/rabbit';

export class RabbitMQ implements RabbitMQService {
    
    private connection: amqp.Connection | null = null;

    async connect(): Promise<void> {
        this.connection = await amqp.connect('amqp://rabbit');
    }

    async publishMessage(exchange: string, routingKey: string, message: any): Promise<void> {
        if (!this.connection) {
            throw new Error('RabbitMQ connection not established');
        }
        
        const channel = await this.connection.createChannel();
        channel.assertExchange(exchange, 'direct', { durable: false });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
    }
}