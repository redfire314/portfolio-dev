const {Sequelize} = require('sequelize');

// Don't upload your credentials!
const conn = new Sequelize('db_name', 'db_user', 'db_password', {
    host: 'db_host',
    dialect: 'mysql'
});

try {
    conn.authenticate();
    console.log('Database authenticated');
} catch (err) {
    console.log(err);
}

module.exports = conn;
