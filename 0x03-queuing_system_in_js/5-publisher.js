const { createClient } = import('redis');
const client = createClient();

/* 
Redis Publisher and Subscriber are two components of Redis' Pub/Sub (Publish/Subscribe) messaging system
Publisher:

Role: Sends messages to one or more channels
Does not need to know about subscribers
Can publish to multiple channels
Uses the PUBLISH command
*/

const publishMessage = (message, time) => {
    setTimeout(() => {
        console.log('About to send MESSAGE');
        client.publish('holberton school channel', message);
    }, time);
}

try {
    client.on('error', (error) => {
        console.log(`Redis client not connected to the server: ${error.message}`);
    });
    client.on('connect', () => {
        console.log('Redis client connected to the server');
    })
    client.connect();

} catch (error) {
    console.log(error);
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);