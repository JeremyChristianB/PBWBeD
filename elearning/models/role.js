const pool = require('../config/connection')

const getRoleData = () => {
    const sql = "SELECT * FROM role";

    return pool.promise().query(sql)
            .then((data) => {
                return data[0];
            })
}

module.exports = {
    getRoleData,
}