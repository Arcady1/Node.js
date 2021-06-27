"use strict";

const database = require('../database/db_functions');

async function getDbData_(req, res) {
    const data = await database.getDbData();
    res.status(201).json(data);
}

async function addDbData_(req, res) {
    const inputData = req.body;

    await database.addDbData(inputData);
    res.status(201).json(inputData);
}

async function removeDbData_(req, res) {
    const id = +(req.params.id).substring(1);

    await database.removeDbData(id);
    res.json({});
}

module.exports = {
    getDbData_,
    addDbData_,
    removeDbData_,
}