import { kafka } from '../../config/kafka.config'
export const group = process.argv[2];

if (!group) {
    console.error("Error: Consumer groupId must be provided as the second argument.");
    process.exit(1);
}

export class KafkaConsumer {

    static async init(){
        try {
            const consumer = kafka.consumer({ groupId: group });
            if(consumer) return consumer;
        } catch (error) {
            throw error;
        }
    }
}