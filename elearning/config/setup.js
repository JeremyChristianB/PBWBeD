const pool = require('./connection');

const dropTeacherQuery = `DROP TABLE IF EXISTS teachers CASCADE`
const dropUserQuery = `DROP TABLE IF EXISTS users CASCADE`
const dropRoleQuery = `DROP TABLE IF EXISTS role CASCADE`

const createTeacherQuery = `CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    expertise VARCHAR(255),
    rate DECIMAL(10, 2)
)`

const createRoleQuery = `CREATE TABLE IF NOT EXISTS role(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255)
)`

const createUserQuery = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(150),
    role_id INTEGER,
    teacher_id INTEGER,
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role(id)
)`

pool.query(dropTeacherQuery, (err) => {
    if(err) {
        console.log(err);
    } else {
        pool.query(dropUserQuery, (err) => {
            if(err) {
                console.log(err)
            }else {
                pool.query(dropRoleQuery, (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        pool.query(createTeacherQuery, (err) => {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log('====================================');
                                console.log('---- Teachers table created');
                                
                                pool.query(createRoleQuery, (err) => {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        console.log('---- Role table created');

                                        pool.query(createUserQuery, (err) => {
                                            if(err) {
                                                console.log(err);
                                            } else {
                                                console.log('---- Users table created');
                                                
                                                console.log("---- DATABASE CREATED");
                                                console.log('====================================');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                })
            }
        })
        
    }
});