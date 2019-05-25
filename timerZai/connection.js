const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwtimer"
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected".rainbow);
    } else {
        console.log("Error while connecting with database");
    }
});

module.exports = connection;