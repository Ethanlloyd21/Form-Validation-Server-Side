const connection = require('./connection');
const bcrypt = require('bcrypt');

function User() { };

User.prototype = {

    find: function (user = null, callback) {
        if (user) {
            let field = Number.isInteger(user) ? 'id' : 'email';
        }

        let sql = `SELECT * FROM user ${field} = ?`;

        connection.query(sql, user, function (err, res) {
            if (err) throw err
            callback(res);
        });
    },

    create: function (body, callback) {
        let pwd = body.password;
        body.password = bcrypt.hashSync(pwd, 10);

        var bind = [];
        for (prop in body) {
            bind.push(prop);
        }

        let sql = `INSERT INTO user(email, password) VALUES (?, ?)`;

        connection.query(sql, bind, function (err, lastId) {
            if (err) throw err;
            callback(lastId);
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

