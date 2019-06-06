const connection = require("./connection");

module.exports.insert = function (request, response) {
    if (request.session.loggedin) {
        let sql = `INSERT INTO times (time, userID) VALUES( 4.32 , ?)`;

        connection.query(sql, [request.session.userID], function (err, data) {
            if (err) {
                response.json({
                    message: 'there are some error with query'
                })
            } else {
                response.json({
                    message: 'time succesfully added'
                })
            }
        });
    } else {
        response.send('Please login to insert data!');
    }
}