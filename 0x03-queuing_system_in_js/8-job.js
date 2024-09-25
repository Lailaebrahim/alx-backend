const createPushNotificationsJobs = (jobs, queue) => {
    if (typeof (jobs) != typeof ([])) {
        throw new Error('Jobs must be an array');
    }
    for (let jobData in jobs) {
        const job = queue.create('push_notification_code_3', jobData);
        job.on('enqueue', () => {
            console.log(`Notification job created: ${job.id}`);
        })
            .on('complete', () => {
                console.log(`Notification job ${job.id} completed`);
            })
            .on('failure', (err) => {
                console, log(`Notification job ${job.id} failed: ${err.message}`);
            })
            .on('progress', (progress, _data) => {
                console.log(`Notification job ${job.id} ${progress}% complete`);
            });
        job.save();
    }

};
