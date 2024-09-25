// Import the kue library for creating and managing job queues
const kue = require('kue');

// Create a new queue instance
const queue = kue.createQueue({name : 'push_notification_code'});

// Define the job data with phone number and message
const jobData = {
    phoneNumber: '12345678',
    message: 'laila',
};

// Create a new job in the queue with the type 'push_notification_code' and the job data
const job = queue.create('push_notification_code', jobData)

// Set up event listeners for the job
job.on('enqueue', () => {
    // Log when the job is enqueued
    console.log(`Notification job created: ${job.id}`);
}).on('complete', () => {
    // Log when the job is completed
    console.log('Notification job completed');
}).on('failed', (err) => {
    // Log when the job fails along with the error
    console.log('Notification job failed', err);
});

job.save();