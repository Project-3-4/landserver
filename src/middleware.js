const query = require('database');
const colors = require("colors");

/**
 * Function to get current Balance
 * @param userid
 */
async function getBalance(userid) {
    query.get();
}

/**
 * Withdraw from Balance
 * @param userid
 */
async function withdraw() {
    query.update();
}

/**
 * Function to get current transaction state
 * @return true or false. State defaults on false since the transaction needs to be verified.
 */
async function getState() {
    query.get();
}

/**
 * Function to set new transaction state
 * @param true or false. True is used when the transaction succeeded
 */
async function setState() {
    query.update();
}
