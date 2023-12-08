// Import the redis package
const redis = require('redis');

// Create a new client
const client = redis.createClient({
  host: 'localhost', // replace with your host, if different
  port: 6379 // replace with your port, if different
});

// Handle errors
client.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

client.connect();

// Export the client
module.exports = client;