const Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

const connection = require("./connection");


module.exports.log = function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
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
                        request.session.userID = results[0].userID;

                        response.redirect('/timer');
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