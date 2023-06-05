const pool = require('../config/connection')

const insertTeacherAccount = (params) => {
    const sql = "INSERT INTO teachers(full_name, address, phone_number) VALUES (?, ?, ?)";

    return pool.promise().query(sql, [params.full_name, params.address, params.phone_number])
    .then(([rows, fields]) => {
        return rows;
    });
}

module.exports = {
    insertTeacherAccount
}