const query = require('database.js');
const colors = require("colors");

/**
 * Function to get current Balance
 * @param userid
 */
async function getBalance(userid) {
    query.table('balance'); // Set table
    query.get(['balance']); // Get current balance
    // query.where(['userid', '=', userid]) // Where userid == X
    return query.transaction(); // Execute query on set table
}

/**
 * Withdraw from Balance
 * @param userid
 */
async function withdraw(currentBalance, withdrawAmount) {
    const newBalance = currentBalance - withdrawAmount;
    query.table('account'); // Set table
    query.update({balance:newBalance}); // Update balance
    query.where(['userid', '=', userid]) // Where userid == X
    return query.transaction(); // Execute query on set table
}

/**
 * Deposit to bank account
 * @param userid
 */
async function deposit(currentBalance, depositAmount) {
    const newBalance = currentBalance + depositAmount;
    query.table('account'); // Set table
    query.update({balance:newBalance}); // Update balance
    query.where(['userid', '=', userid]) // Where userid == X
    return query.transaction(); // Execute query on set table
}

/**
 * Function to get current transaction state
 * @return true or false. State defaults on false since the transaction needs to be verified.
 */
async function getState(transactionId) {
    query.table('transaction'); // Set table
    query.get(['state']); // Get current balance
    query.where(['id', '=', transactionId]) // Where userid == X
    return query.transaction(); // Execute query on set table
}

/**
 * Function to set new transaction state
 * @param true or false. True is used when the transaction succeeded
 */
async function setState(transactionId, newState) {
    query.table('transaction'); // Set table
    query.update({state:newState}); // Update balance
    query.where(['id', '=', transactionId]) // Where userid == X
    return query.transaction(); // Execute query on set table
}

module.exports = {
    getBalance,
    withdraw,
    deposit,
    getState,
    setState
};