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
const saveData = require("./insertToDB.js");
const getTimes = require("./getTimes.js");
const deleteTime = require("./deleteTime.js");
const deleteAllTimes = require("./deleteAllTimes.js");


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



app.use("/public", express.static(__dirname + '/public'));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/timer.html'));
});

app.get('/css/style.css', function (request, response) {
    response.sendFile(path.join(__dirname + '/css/style.css'));
});

app.get('/timer', function (request, response) {
    if (request.session.loggedin) {
        console.log(request.session.times)
        response.render("loggedTimer", {
            login: request.session.username,
            timesArray: request.session.times
        });
    } else {
        response.send('Please login to view this page!');
    }
});

app.post("/log", function (request, response) {
    response.sendFile(path.join(__dirname, "/loginForm.html"));
})

app.post("/reg", function (request, response) {
    response.sendFile(path.join(__dirname, "/registForm.html"));
})

app.post("/unlogedTimer", function (request, response) {
    response.sendFile(path.join(__dirname, "/timer.html"));
})

app.post("/regist", regist.reg)

app.post("/auth", login.log);

app.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                res.sendFile(path.join(__dirname + '/timer.html'));
            }
        });
    }
});

app.post("/insertToDB", saveData.insert);

app.get("/getTimesFromDB", getTimes.getTimes);

app.delete("/deleteFromDB", deleteTime.deleteTime);

app.delete("/deleteAllTImesFromDB", deleteAllTimes.deleteAllTimes);

app.listen(3000);