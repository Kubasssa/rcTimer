const Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

const connection = require("./connection");
let resultJSON = {
    login: "",
    id: 0
};

let times = {};

module.exports.log = function (request, response) {
    let username = request.body.username;
    let password = request.body.password;


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
                        request.session.username = username;

                        resultJSON.login = results[0].login;
                        console.log(resultJSON);

                        connection.query('SELECT time FROM times WHERE userID = ?', [results[0].userID], function (error, results, fields) {
                            if (error) {
                                response.json({
                                    status: false,
                                    message: 'there are some error with query'
                                })
                            } else {
                                for (let i = 0; i < results.length; i++) {
                                    times[i] = results[i].time;
                                }
                                // times = results;
                                console.log(times)
                                response.end();
                            }
                        });

                        // response.redirect('/timer');
                        response.render("loggedTimer", {
                            login: resultJSON.login,
                            timesArray: times
                        })
                    } else {
                        response.json({
                            status: false,
                            message: "password is not correct"
                        });
                    }
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
};