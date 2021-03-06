const express = require("express");
const https = require("https");
const http = require("http");
const filesystem = require("fs");
const colors = require("colors");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

const call = require('./functions.js');
const {transaction} = require("./database");

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
app.get("/api/balance/get", async (req, res) => {
    const userid = req.params.userid;
    const balance = await call.getBalance(userid);
    res.JSON(balance);
});

// Withdraw
app.post("/api/withdraw/post", async (req, res) => {
    const userid = req.body.userid;
    const withdrawAmount = req.body.withdrawAmount;
    const currentBalance = await call.getBalance(userid);
    const withdraw = await call.withdraw(currentBalance, withdrawAmount);
});

// Deposit
app.post("/api/deposit/post", async (req, res) => {
    const userid = req.body.userid;
    const depositAmount = req.body.depositAmount;
    const currentBalance = await call.getBalance(userid);
    const deposit = await call.deposit(currentBalance, depositAmount);
});

// Status
app.get("/api/state/get", async (req, res) => {
    const transactionid = req.params.transactionId;
    const state = await call.getState(transactionid);
    res.JSON(state);
});

app.post("/api/state/post", async (req, res) => {
    const userid = req.body.transactionId;
    const depositAmount = req.body.newState;
    const state = await call.setState(transactionId, newState);
});

// GUI
app.get("/graphical", async (req, res) => {
  let d = await call.getBalance(1);
  d.then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  });
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
