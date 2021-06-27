"use strict";

const mysql = require('mysql');

let connection = {};

function connectToDb(config) {
    connection = mysql.createConnection(config);
    connection.connect();
}

function getDbData(SQL_ = "SELECT * FROM names") {
    return new Promise((resolve, reject) => {
        connection.query(SQL_, (err, results, fields) => {
            if (err)
                console.log(err);
            else {
                console.log(`Success query:\n${SQL_}\n${"=".repeat(41)}`);
                resolve(results);
            }
        });
    });
}

function addDbData(data) {
    const SQL_ = `INSERT INTO names (name, age, sex) VALUES ('${data.name}', ${data.age}, '${data.sex}');`;

    return new Promise((resolve, reject) => {
        connection.query(SQL_, (err, result, fields) => {
            if (err)
                console.log(err);
            else {
                console.log(`Success query:\n${SQL_}\n${"=".repeat(41)}`);
                resolve();
            }
        })
    });
}

function removeDbData(rowId) {
    const SQL_ = `DELETE FROM names WHERE id=${rowId};`;

    return new Promise((resolve, reject) => {
        connection.query(SQL_, (err, result, fields) => {
            if (err)
                console.log(err);
            else {
                console.log(`Success query:\n${SQL_}\n${"=".repeat(41)}`);
                resolve();
            }
        });
    });
}

module.exports = {
    connectToDb,
    getDbData,
    addDbData,
    removeDbData
}