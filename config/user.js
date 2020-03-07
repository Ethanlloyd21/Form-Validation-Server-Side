const connection = require('./connection');
const bcrypt = require('bcrypt');

function User() { };

User.prototype = {

    find: function (user = null, callback) {
        let field;
        var test = Number.isInteger(user);
        if (user === test) {
            // if user = number return field = id, if user = string return field = username.
            field = 'id';
        }
        else field = 'email';
        // prepare the sql query
        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        connection.query(sql, user, function (err, res) {
            if (err) throw err

            if (result.length) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },

    create: function (body, callback) {
        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd, 10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for (prop in body) {
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO users(email, password) VALUES (?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, bind, function (err, result) {
            if (err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },

    login: function (email, password, callback) {
        this.find(email, function (user) {
            if (user) {
                if (bcrypt.compareSync(password, user.password)) {
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
}

module.exports = User;

