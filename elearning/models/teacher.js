const pool = require('../config/connection')

const getTeacherDataById = (teacher_id) => {
    const sql = "SELECT * FROM teachers WHERE id = ?";

    return pool.promise().query(sql, [teacher_id])
            .then((data) => {
                return data[0];
            })
}

module.exports = {
    getTeacherDataById
}