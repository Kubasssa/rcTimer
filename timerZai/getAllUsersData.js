const connection = require("./connection");


module.exports.getUsersData = function (request, response) {

    request.session.usersNames = [];
    request.session.usersID = [];

    if (request.session.loggedin) {
        connection.query('SELECT * FROM userdata', function (error, results, fields) {
            if (error) {
                response.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                for (let i = 0; i < results.length; i++) {
                    request.session.usersNames.push(results[i].login);
                    request.session.usersID.push(results[i].userID);
                    console.log(request.session.usersID);
                }
                response.redirect('/adminPanel');
            }
        });
    } else {
        response.send('Please login to insert data!');
        response.end();
    }
};