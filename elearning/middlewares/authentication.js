const jwt = require('jsonwebtoken');

const authentication = (token) => {
    const decode = jwt.verify(token, process.env.SECRET_KEY)

    return decode;
}

module.exports = authentication;