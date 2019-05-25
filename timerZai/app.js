const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const colors = require('colors');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
const connection = require("./connection");

const login = require("./login.js");
const regist = require("./regist.js");

app.set("view engine", "ejs");

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.locals.name = "kubasa";

// app.use(express.static("/public/"));
app.use("/public", express.static(__dirname + '/public'));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/timer.html'));
});

app.get('/css/style.css', function (request, response) {
    response.sendFile(path.join(__dirname + '/css/style.css'));
});


app.get('/timer', function (request, response) {
    if (request.session.loggedin) {
        response.render("loggedTimer", {
            login: login.data
        });

        // response.sendFile(path.join(__dirname + '/loggedTimer.html'));
    } else {
        response.send('Please login to view this page!');
    }
    // response.end();
});

app.post("/log", function (request, response) {
    response.sendFile(path.join(__dirname, "/loginForm.html"))
})

app.post("/auth", login.log);

app.listen(3000);