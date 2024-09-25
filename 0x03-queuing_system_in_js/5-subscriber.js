const { createClient } = import('redis');
const client = createClient();

/* 
Redis Publisher and Subscriber are two components of Redis' Pub/Sub (Publish/Subscribe) messaging system
Subscriber:
Role: Listens for messages on one or more channels
Can subscribe to multiple channels
Receives messages in real-time as they are published
Uses the SUBSCRIBE command
*/
try {
    client.on('error', (error) => {
        console.log(`Redis client not connected to the server: ${error.message}`);
    });
    client.on('connect', () => {
        console.log('Redis client connected to the server');
    })
    client.connect();

    client.on('message', (message) => {
        if (message === 'KILL_SERVER') {
            client.unsubscribe();
            client.quit();
        }
        else {
            console.log(message);
        }
    })
    client.subscribe('holberton school channel');
} catch (error) {
    console.log(error);
}