var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var colors = require('colors');
var path = require('path');

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


var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/loginForm.html'));
});

app.get('/css/style.css', function (request, response) {
    response.sendFile(path.join(__dirname + '/css/style.css'));
});


app.get('/timer', function (request, response) {
    if (request.session.loggedin) {
        response.sendFile(path.join(__dirname + '/timer.html'));
    } else {
        response.send('Please login to view this page!');
    }
    // response.end();
});

app.post('/auth', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {

        connection.query('SELECT * FROM userdata WHERE login = ? AND password = ?', [username, password], function (error, results, fields) {
            console.log(results);
            if (error) {
                response.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/timer');
                } else {
                    response.send('Incorrect Username and/or Password!');
                }
                response.end();
            }
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

app.listen(3000);