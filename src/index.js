const express = require("express");
const https = require("https");
const http = require("http");
const filesystem = require("fs");
require("dotenv").config({
    path: filesystem.readFileSync(".env", "utf8"),
});

// https://gitlab.cmi.hro.nl/skelm/noob/-/blob/master/src/landserver_T1/server.js
if (process.env.DEBUG == false) {
    let privateKey  = filesystem.readFileSync("certificates/", "utf8");
    let certificate = filesystem.readFileSync("certificates/", "utf8");
    let credentials = {
        key: privateKey,
        cert: certificate,
    };
}


let app = express();
let PORT = process.env.URL_PORT;


/*
 * Define JSON objects
 */
let fromC, fromB, toC, toB, requestState = 'false';
let accountNr, moneyAmount;

const transferObj = {
    'fromC': fromC,
    'fromB': fromB,
    'toC': toC,
    'toB': toB,
    'state': requestState
}

const infoObj = {
    'accountNr': accountNr,
    'money': moneyAmount
}

/*
 * Routing
 */
// Balance
app.post('/balance', (req, res) => {
  res.send(infoObj);
});

// Withdraw
app.post('/withdraw', (req, res) => {
  res.send(transferObj);
});

// Status
app.get('/status', (req, res) => {
    res.json(transferObj.state);
});

// GUI
app.get('/graphical', (req, res) => {
    res.send("Page for de GUI");
});


/**
 * Setup server
 */
// When de app enters production state
if (process.env.DEBUG == false) {
    let server = https.createServer(credentials, app).listen(PORT);
// When de app is in debug state
} else {
    let server = http.createServer(app).listen(PORT);
}
