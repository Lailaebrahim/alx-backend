import { createClient } from 'redis';
import { promisify } from 'util';

const REDIS_PORT = process.env.PORT || 6379;
const client = createClient({ url: `redis://localhost:${REDIS_PORT}` });

const hgetallAsync = promisify(client.hgetall).bind(client);

(async () => {
  try {
    client.on('error', err => console.log('Redis client not connected to the server: ', err));
    client.on('connect', () => console.log('Redis client connected to the server'));
      
    await client.connect();

    // Create Hash
    /**A Redis HSET (Hash Set) is a data structure that allows you to store field-value pairs within a key. */
    client.hset('HolbertonSchools', 'Portland', 50, redis.print);
    client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
    client.hset('HolbertonSchools', 'New York', 20, redis.print);
    client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
    client.hset('HolbertonSchools', 'Cali', 40, redis.print);
    client.hset('HolbertonSchools', 'Paris', 2, redis.print);

    // Display Hash
    const result = await hgetallAsync('HolbertonSchools');
    console.log(result);

  } catch (err) {
    console.error('Redis client not connected to the server: ', err);
  }
})();