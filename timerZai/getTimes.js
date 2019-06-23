const Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

const connection = require("./connection");


module.exports.getTimes = function (request, response) {

    request.session.times = [];
    request.session.timesID = [];

    if (request.session.loggedin) {
        connection.query('SELECT * FROM times WHERE userID = ?', [request.session.userID], function (error, results, fields) {
            if (error) {
                response.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                for (let i = 0; i < results.length; i++) {
                    request.session.times.push(results[i].time);
                    request.session.timesID.push(results[i].timeID);
                    console.log(request.session.timesID);
                }
                response.redirect('/timer');
            }
        });
    } else {
        response.send('Please login to insert data!');
        response.end();
    }
};