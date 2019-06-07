const Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

const connection = require("./connection");


module.exports.getTimes = function (request, response) {

    if (request.session.loggedin) {
        connection.query('SELECT time FROM times WHERE userID = ?', [request.session.userID], function (error, results, fields) {
            if (error) {
                response.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                for (let i = 0; i < results.length; i++) {
                    request.session.times.push(results[i].time);
                }
                response.redirect('/timer');
            }
        });
    } else {
        response.send('Please login to insert data!');
        response.end();
    }
};