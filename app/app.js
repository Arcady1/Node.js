const mysql = require('mysql');
const config = require('./config.json');
const SQL_ = 'SELECT * FROM names;';

queryToDB(config, SQL_);

function queryToDB(config, SQL_) {
    let connection = {};

    const prom = new Promise((resolve, reject) => {
        connection = mysql.createConnection(config);
        resolve();
    });

    prom.then(() => {
            return new Promise((resolve, reject) => {
                connection.connect((err) => {
                    if (err)
                        reject(err);
                    else {
                        console.log('Success connection!');
                        resolve(SQL_);
                    }
                });
            });
        })
        .then((SQL_) => {
            return new Promise((resolve, reject) => {
                connection.query(SQL_, (error, results, fields) => {
                    if (error)
                        reject(error);
                    else {
                        console.log('Query result:');
                        console.log(results);
                        resolve();
                    }
                });
            })
        })
        .then(() => {
            connectionEnd(connection);
        })
        .catch((err) => {
            console.log(err);
            connectionEnd(connection);
        });

    function connectionEnd(connection) {
        connection.end((err) => {
            if (err)
                throw err;
            else
                console.log("Success end connection!");
        });
    }
}