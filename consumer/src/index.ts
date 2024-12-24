import { TOPICS } from "./constants";
import { KafkaConsumer } from "./modules/consumer/kafkaConsumer";
import { group } from "./modules/consumer/kafkaConsumer";

const start = async () => {
  try {
    const consumer = await KafkaConsumer.init();
    if (!consumer) throw new Error("Failed to create Kafka Consumer.");

    await consumer.connect();
    await consumer.subscribe({ topics: [TOPICS.RIDER_UPDATES] });

    await consumer.run({
      eachMessage: async ({ topic, partition, message } : {topic: any, partition:any, message: any}) => {
        const value = message.value ? message.value.toString() : "null";
        
        console.log(
          `${group}: [${topic}]: PARTITION:${partition}:`,
          value
        );
      },
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

start();
