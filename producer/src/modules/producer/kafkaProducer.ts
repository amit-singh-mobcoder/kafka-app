import { kafka } from '../../config/kafka.config'

export class KafkaProducer {

    static async init(){
        try {
            const producer = await kafka.producer();
            if(producer) return producer;
        } catch (error) {
            throw error;
        }
    }
}