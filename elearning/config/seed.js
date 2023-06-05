const pool = require('./connection');
const fs = require('fs');

let dataRole = fs.readFileSync('databases/role.json', { encoding: 'utf-8' });

pool.getConnection((err, connection) => {
  if (err) throw err;

  dataRole = JSON.parse(dataRole);
  dataRole.forEach((role, index) => {
    const sql = "INSERT INTO role (id, role_name) VALUES (?, ?)";
    const values = [role.id, role.role_name];

    connection.query(sql, values, (err, results) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log('Success insert role data', index);
      }
    });
  });

  connection.release(); 
});
