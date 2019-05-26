const Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");
const getTimes = require("./getTimes.js");

const connection = require("./connection");


module.exports.log = function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let queryFlag = false;
    request.session.times = [];
    if (username && password) {

        connection.query('SELECT * FROM userdata WHERE login = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) {
                response.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                if (results.length > 0) {
                    // decryptedString = cryptr.decrypt(results[0].password);
                    decryptedString = results[0].password;
                    if (password == decryptedString) {
                        request.session.loggedin = true;
                        request.session.username = results[0].login;

                        connection.query('SELECT time FROM times WHERE userID = ?', [results[0].userID], function (error, results, fields) {
                            if (error) {
                                response.json({
                                    status: false,
                                    message: 'there are some error with query'
                                })
                            } else {
                                for (let i = 0; i < results.length; i++) {
                                    request.session.times.push(results[i].time);
                                }
                                // request.session.times = results[0].time;
                                queryFlag = true;
                                response.redirect('/timer');
                            }
                            response.end();
                            console.log("response is ended")
                        });
                    } else {
                        response.json({
                            status: false,
                            message: "password is not correct"
                        });
                    }
                } else {
                    response.send('Incorrect Username and/or Password!');
                }
            }
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
};