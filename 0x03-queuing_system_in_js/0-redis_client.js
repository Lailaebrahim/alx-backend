import { createClient } from 'redis';

const REDIS_PORT = process.env.PORT || 6379;

/* defining an asyn function to use await before connect to wait for establishing connection */
(async () => {
  try {
    const client = createClient({ url: `redis://localhost:${REDIS_PORT}` });

    /* set an event listener to both error and connect events*/
    client.on('error', err => console.log('Redis client not connected to the server: ', err));
    client.on('connect', () => console.log('Redis client connected to the server'));
      
    await client.connect();
      
  } catch (err) {
    console.error('Redis client not connected to the server: ', err);
  }
})();