import { Request, Response } from "express";
import { KafkaProducer } from "../modules/producer/kafkaProducer";
import { TOPICS } from "../constants";

export class TestController {
    
    test = async (req: Request, res: Response) => {
        try {
            const { riderName, location } = req.body;
            if(!riderName || !location) {
                throw new Error('Both riderName and location are required.')
            }
            const producer = await KafkaProducer.init();
            if(!producer){
                throw new Error('Failed to create Kafka Producer')
            }
            await producer.connect()
            const result = await producer.send({
                topic: TOPICS.RIDER_UPDATES,
                messages: [
                    {
                        partition: location.toLowerCase() === 'north' ? 0 : 1,
                        key: "location-update",
                        value: JSON.stringify({name: riderName, location })
                    }
                ]
            })

            return res.status(200).json({
                success: true,
                input: { name: riderName, location },
                result
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.message
            })
        }
    }
}