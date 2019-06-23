const Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

const connection = require("./connection");


module.exports.reg = function (request, response) {
    let username = request.body.username;
    let password = request.body.password;
    let repeatPassword = request.body.repeatPassword;

    if (username && password && repeatPassword) {
        if (password === repeatPassword) {

            connection.query('INSERT INTO userdata (login, password) VALUES (?, ?)', [username, password], function (error, results, fields) {
                if (error) {
                    response.json({
                        status: false,
                        message: 'there are some error with query'
                    })
                } else {

                    response.redirect("/");
                }
            });
        } else {
            response.send('passwords are different');
            response.end();
        }
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
};