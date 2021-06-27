"use strict";

const express = require('express');
const path = require('path');
const database = require('./database/db_functions');
const serverRoutes = require('./routes/routs').router;

const app = express();
const port = process.env.PORT || 8080;

main();

database.connectToDb(require('./database/config.json'));

function main() {
    app.listen(port, () => {
        console.log(`Server is runnig at http://localhost:${port}\n${"=".repeat(41)}`);
    });

    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, 'ejs'));

    app.use(express.json());
    app.use(express.urlencoded({
        extended: false
    }));
    app.use(express.static(`${__dirname}/static`));
    app.use(serverRoutes);
    app.use((req, res) => {
        res.status(404).render('404', {
            "title": "404",
            "active": "none",
        });
    });
}