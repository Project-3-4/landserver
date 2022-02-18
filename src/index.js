const express = require("express");
const https = require("https");
const http = require("http");
const filesystem = require("fs");

let privateKey  = filesystem.readFileSync("", "utf8");
let certificate = filesystem.readFileSync("", "utf8");

let app = express();
let PORT = 8000;
let credentials = {
    key: privateKey,
    cert: certificate,
};

app.post()

/**
 * Setup server
 */
let server = https.createServer(credentials, app).listen(PORT);