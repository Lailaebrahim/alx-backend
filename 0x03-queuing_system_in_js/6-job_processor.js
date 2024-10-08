// Import the kue library for creating and managing job queues
const kue = require('kue');

// Create a new queue instance
const queue = kue.createQueue()

const sendNotification = (phoneNumber, message) => {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

queue.process('push_notification_code', (job, done) => {
    try {
        const { phoneNumber, message } = job.data;
        sendNotification(phoneNumber, message);
        done();

    } catch (error) {
        console.log(error);
    }
});