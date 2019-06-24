const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const colors = require('colors');
const path = require('path');
const serveStatic = require('serve-static');
const multer = require('multer');
const upload = multer({
    dest: __dirname + '/public/cubePics'
});

const app = express();
const connection = require("./connection");

const login = require("./login.js");
const regist = require("./regist.js");
const saveData = require("./insertToDB.js");
const getTimes = require("./getTimes.js");
const deleteTime = require("./deleteTime.js");
const deleteAllTimes = require("./deleteAllTimes.js");
const getAllUsersData = require("./getAllUsersData.js");


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

app.get('/adminPanel', function (request, response) {
    if (request.session.loggedin) {
        response.render("adminPanel", {
            login: request.session.username,
            usersNames: request.session.usersNames,
            usersID: request.session.usersID
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
                res.redirect("/");
            }
        });
    }
});

app.post("/insertToDB", saveData.insert);

app.get("/getTimesFromDB", getTimes.getTimes);

app.get("/getAllUsersData", getAllUsersData.getUsersData);

app.delete("/deleteFromDB", deleteTime.deleteTime);

app.delete("/deleteAllTImesFromDB", deleteAllTimes.deleteAllTimes);

app.post('/upload', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.json(req.file);
    } else throw 'error';
});

app.put("/blockUser", (req, res) => {

    const index = req.body.item;
    let isBlocked = false;
    let blockedValue = 0;

    let sql1 = `SELECT blockFlag FROM userdata
    WHERE userID = ?`;

    connection.query(sql1, index, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log('all correct');
        if (results[0].blockFlag === 0) isBlocked = true;

        if (isBlocked) blockedValue = 1;

        console.log(blockedValue)
        console.log(index)
        let sql = `UPDATE userdata
            SET blockFlag = ?
            WHERE userID = ?`;

        connection.query(sql, [blockedValue, index], (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
        });
    });



});

app.listen(3000);