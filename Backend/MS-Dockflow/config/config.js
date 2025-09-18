require('dotenv').config();

const SERVER_CONFIG = {
    SERVER_PORT: process.env.SERVER_PORT || "3005",
    API: process.env.API || "https://apirep.registromercantil.gob.gt",
}

const DATABASE_CONFIG = {
    DATABASE_ADDR: process.env.DATABASE_ADDR || "131.107.5.92",
    KEYSPACE: process.env.KEYSPACE || "evisor"
}

const TEST_CONFIG = {
    SAMPLE_TOKEN: process.env.SAMPLE_TOKEN || ""
}

module.exports = {
    SERVER_CONFIG,
    DATABASE_CONFIG,
    TEST_CONFIG
}