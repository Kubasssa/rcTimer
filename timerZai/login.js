const Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

const connection = require("./connection");


module.exports.log = function (request, response) {
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {

        connection.query('SELECT * FROM userdata WHERE login = ?', [username], function (error, results, fields) {
            if (error) {
                response.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                if (results.length > 0) {
                    decryptedString = cryptr.decrypt(results[0].password);
                    //decryptedString = results[0].password;
                    if (password == decryptedString) {
                        if (results[0].blockFlag === 1) {
                            request.session.loggedin = true;
                            request.session.username = results[0].login;
                            request.session.userID = results[0].userID;

                            if (username === "admin" && password == "admin") {
                                response.redirect("/getAllUsersData");
                            } else {
                                response.redirect('/getTimesFromDB');
                            }
                        } else {
                            console.log("you are blocked ");
                            response.redirect("/");
                        }
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