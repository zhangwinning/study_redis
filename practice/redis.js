let redis = require('redis');

let client = redis.createClient('redis://localhost:6379');

module.exports = client;