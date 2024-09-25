const { expect } = require('chai');
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');

describe('createPushNotificationsJobs', () => {
    let queue;

    beforeEach(() => {
        queue = kue.createQueue();
        kue.Job.rangeByType('push_notification_code_3', 'inactive', 0, -1, 'asc', (err, jobs) => {
            jobs.forEach(job => job.remove());
        });
        queue.testMode.enter();
    });

    afterEach(() => {
        queue.testMode.clear();
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs('not an array', queue)).to.throw('Jobs must be an array');
    });

    it('should create jobs for each job data in the array', () => {
        const jobs = [
            { phoneNumber: '1234567890', message: 'Test message 1' },
            { phoneNumber: '0987654321', message: 'Test message 2' }
        ];

        createPushNotificationsJobs(jobs, queue);

        expect(queue.testMode.jobs.length).to.equal(2);
        expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
        expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
        expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
    });

    it('should log the correct messages on job events', (done) => {
        const jobs = [
            { phoneNumber: '1234567890', message: 'Test message 1' }
        ];

        const log = console.log;
        const logs = [];
        console.log = (message) => logs.push(message);

        createPushNotificationsJobs(jobs, queue);

        const job = queue.testMode.jobs[0];
        job.emit('enqueue');
        job.emit('complete');
        job.emit('failure', new Error('Test error'));
        job.emit('progress', 50);

        expect(logs).to.include(`Notification job created: ${job.id}`);
        expect(logs).to.include(`Notification job ${job.id} completed`);
        expect(logs).to.include(`Notification job ${job.id} failed: Test error`);
        expect(logs).to.include(`Notification job ${job.id} 50% complete`);

        console.log = log;
        done();
    });
});
