"use strict";

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/', (req, res) => {
    res.render('index', {
        "title": "Main page",
        "active": "main",
    });
});
router.get('/contacts', (req, res) => {
    res.render('contacts', {
        "title": "Contacts page",
        "active": "contacts",
    });
});
router.get('/api/db', controllers.getDbData_);
router.post('/api/db', controllers.addDbData_);
router.delete('/api/db:id', controllers.removeDbData_);

module.exports = {
    router,
}