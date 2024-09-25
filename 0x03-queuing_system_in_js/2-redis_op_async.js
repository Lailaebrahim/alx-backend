import { createClient } from 'redis';
/** promisify used to convert the th functions that uses callbacks to return a promise which prevent callback hell*/
import { promisify } from 'util';

const REDIS_PORT = process.env.PORT || 6379;
const client = createClient({ url: `redis://localhost:${REDIS_PORT}` });

const getAsync = promisify(client.get).bind(client);

(async () => {
  try {
    client.on('error', err => console.log('Redis client not connected to the server: ', err));
    client.on('connect', () => console.log('Redis client connected to the server'));
      
    await client.connect();
  } catch (err) {
    console.error('Redis client not connected to the server: ', err);
  }
})();

const setNewSchool = async (schoolName, value) => {
  try {
    await client.set(schoolName, value, redis.print);
  } catch (err) {
    console.error('Error setting value:', err);
  }
};

const displaySchoolValue = async (schoolName) => {
  try {
    const res = await getAsync(schoolName);
    console.log(res);
  } catch (err) {
    console.error('Error getting value:', err);
  }
};

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');