import { app } from "./app";
import { TOPICS } from "./constants";
import { KafkaAdmin } from "./modules/admin/kafkaAdmin";
import { configDotenv } from "dotenv";
configDotenv()


const startServer = async () => {
  try {
    const PORT = process.env.PORT || 8001;
    const server = app.listen(PORT, () => {
      console.log(`Producer is listening at http://localhost:${PORT}`);
    });

    await KafkaAdmin.createTopics([{ topic: TOPICS.RIDER_UPDATES, numPartitions: 2, replicationFactor: 2 }])

    const shutdown = async () => {
      console.log("Shutting down gracefully...");
      server.close(async () => {
        console.log("HTTP server closed");

        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
