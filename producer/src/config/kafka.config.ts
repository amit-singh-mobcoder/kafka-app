import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:19092', 'localhost:29092', 'localhost:39092'], // use advertise listeners
})
