"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const httpServer = http.createServer((req, res) => {
    const userUrl = req.url;
    const reg = new RegExp("uploads\/*.*");

    if ((reg.test(userUrl)) && (req.method === 'POST')) {
        console.log(__dirname);
    } else
        sendRes(req.url, getContentType(req.url), res);

}).listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});

function sendRes(url, type, res) {
    if (url === '/')
        url = 'index.html';

    const filePath = `${__dirname}/${url}`;

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res
                .writeHead(404)
                .end('File not found!');

            console.log('Error loading:');
            console.log(err);
        } else {
            console.log(`Success loading:\t${filePath}`);

            res
                .writeHead(200, {
                    "Content-type": type
                })
                .end(content);
        }
    });
}

function getContentType(url_) {
    let urlExt = url_;

    if (url_ !== '/')
        urlExt = path.extname(url_).slice(1);

    switch (urlExt) {
        case '/':
        case 'html':
            return `text/html`;
        case 'css':
            return `text/css`;
        case 'js':
            return `text/javascript`;
        case 'json':
            return `application/json`;
        default:
            return `application/octet-stream`;
    }
}