const connection = require("./connection");

// delete a row with id 1
module.exports.deleteTime = function (request, response) {

    const index = request.body.item;
    let sql = `DELETE FROM times WHERE userID = ? AND timeID = ?`;
    console.log(request.session.timesID[index])
    if (request.session.loggedin) {
        connection.query(sql, [request.session.userID, request.session.timesID[index]], (error, results, fields) => {
            if (error) {
                response.json({
                    status: false,
                    message: 'there are some error with query'
                })
                console.log("problem")
            } else {
                response.json({
                    message: 'time succesfully deleted'
                })
                console.log("no problem")
            }
        });
    } else {
        response.send('Please login to insert data!');
        response.end();
    }
};