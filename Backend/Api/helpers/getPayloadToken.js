const jwt = require('jsonwebtoken');

const getPayloadToken = ( token ) => {
    const decoded = jwt.decode(token);
    return decoded;
}

module.exports = {
    getPayloadToken
}