const express = require("express");
const https = require("https");
const http = require("http");
const filesystem = require("fs");
const colors = require("colors");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

const call = require('src/functions.js');

require("dotenv").config({
  path: filesystem.readFileSync(".env", "utf8"),
});

// https://gitlab.cmi.hro.nl/skelm/noob/-/blob/master/src/landserver_T1/server.js
if (process.env.DEBUG == false) {
  let privateKey = filesystem.readFileSync("certificates/", "utf8");
  let certificate = filesystem.readFileSync("certificates/", "utf8");
  let credentials = {
    key: privateKey,
    cert: certificate,
  };
}

let app = express();
const PORT = 8080;


/*
 * Define JSON objects
 */
let fromC = "-", fromB = "-", toC = "-", toB = "-", requestState = "false";
let accountNr = "-", moneyAmount = "-";

const transferObj = {
  fromC: fromC,
  fromB: fromB,
  toC: toC,
  toB: toB,
  state: requestState,
};

const infoObj = {
  accountNr: accountNr,
  money: moneyAmount,
};


/**
 * Function for path routing to other banks
 * 
 * @param name
 * @param json
 */
let routeToOtherBanks = (name, json) => {
    switch (name)
    {
        case "BAOV":

        break;
        case "ODUO":

        break;
        case "MNBK":

        break;
        case "UKIP":

        break;
        default:
        
        break;
    }
};


/**
 * Function for routing to bank outside the country
 * 
 * @param name 
 * @param json 
 */
let routeToBankOutsideCountry = (name, json) => {
  
};

/*
 * Routing
 */
// Balance
app.post("/balance", async (req, res) => {
    // res.send(infoObj);
    const balance = await call.getBalance();
});

// Withdraw
app.post("/withdraw", async (req, res) => {
    // res.send(transferObj);
    const withdraw = await call.withdraw();
});

// Status
app.get("/state", async (req, res) => {
    // res.json(transferObj.state); // Dit moet worden opgevraagd uit de database
    const state = await call.getState();
});

app.post("/newstate", async (req, res) => {
    const state = await call.setState();
});

// GUI
app.get("/graphical", (req, res) => {
  res.send("Page for de GUI");
});

/**
 * Setup server
 */
// When de app enters production state
if (process.env.DEBUG == false) {
  let server = https.createServer(credentials, app).listen(PORT);
  console.log(`[${colors.red("DEBUG OFF")}]\tListening on: https://localhost:${PORT}`);
  // When de app is in debug state
} else {
  let server = http.createServer(app).listen(PORT);
  console.log(`[${colors.green("DEBUG ON")}]\tListening on: http://localhost:${PORT}`);
}
