let redis = require('redis');

let client = redis.createClient(6379, 'localhost');

module.exports = client;