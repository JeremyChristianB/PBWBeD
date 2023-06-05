const pool = require('../config/connection')

const insertUserData = (params) => {
    const sql = "INSERT INTO users(email, password, role_id, teacher_id) VALUES (?, ?, ?, ?)";

    return pool.promise().query(sql, [params.email, params.password, params.role_id, params.teacher_id])
    .then(([rows, fields]) => {
        return rows;
    });
}

const getUserData = (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    return pool.promise().query(sql, [email])
            .then((data) => {
                return data[0];
            })
}

module.exports = {
    insertUserData,
    getUserData,
}