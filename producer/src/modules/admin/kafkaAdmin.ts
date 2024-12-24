import { kafka } from '../../config/kafka.config';

interface ITopic {
  topic: string;
  numPartitions: number;
}

export class KafkaAdmin {
  static async connect() {
    const admin = kafka.admin();
    try {
      console.log('[x] Admin connecting...');
      await admin.connect();
      console.log('[x] Admin connected successfully');
      return admin;
    } catch (error) {
      console.error('[!] Failed to connect Kafka Admin:', error);
      throw error;
    }
  }

  static async createTopics(topics: ITopic[]) {
    const admin = await this.connect();
    try {
      console.log('[x] Creating topics...');
      const result = await admin.createTopics({ topics });
      if (result) {
        console.log('[x] Topics created successfully');
      } else {
        console.log('[!] Topics already exist or creation was skipped');
      }
    } catch (error) {
      console.error('[!] Failed to create topics:', error);
    } finally {
      await admin.disconnect();
      console.log('[x] Admin disconnected successfully');
    }
  }
}
