const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.MYSQL_HOST || "localhost",
        port : 3306,
        user : process.env.MYSQL_USER || "root",
        password : process.env.MYSQL_PASSWORD || "password",
        database : process.env.MYSQL_DATABASE || "test"
    }
});

module.exports = knex