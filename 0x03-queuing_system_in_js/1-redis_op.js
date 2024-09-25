import { createClient } from 'redis';

const REDIS_PORT = process.env.PORT || 6379;
const client = createClient({ url: `redis://localhost:${REDIS_PORT}` });

/* defining an asyn function to use await before connect to wait for establishing connection */
(async () => {
  try {
    /* set an event listener to both error and connect events*/
    client.on('error', err => console.log('Redis client not connected to the server: ', err));
    client.on('connect', () => console.log('Redis client connected to the server'));
      
    await client.connect();
      
  } catch (err) {
    console.error('Redis client not connected to the server: ', err);
  }
})();

const setNewSchool = async (schoolName, value) => {
    try {
    /* waitiing for the set operation and using redis.print as a callback for the redis command to print result of the command */
        await client.set(schoolName, value, redis.print)
    } catch (err) {
        console.error(err);
    }

};

const displaySchoolValue = async (schoolName) => {
    try {
        /* waiting for the get operation */
        await client.get(schoolName, (err, res) => {
            console.log(res);
        });
    } catch (err) {
        console.error(err);
    }

};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');