const cassandra = require('cassandra-driver');
const { DATABASE_CONFIG } = require('../config/config');
const keyspace = DATABASE_CONFIG.KEYSPACE;
let contactPoints = [DATABASE_CONFIG.DATABASE_ADDR];

// let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
let client = new cassandra.Client({
    contactPoints,
    keyspace,
    localDataCenter: 'datacenter1',
    // authProvider,
    socketOptions: {
        readTimeout: 3600000,
    },
});

module.exports = {
    client
}