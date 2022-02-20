const mysql = require("mysql");
const colors = require("colors");

/*
 * Load values fron environment file
 */
require("dotenv").config({
    path: filesystem.readFileSync(".env", "utf8"),
});

const domain = process.env.DATABASE_DOMAIN
const schema = process.env.DATABASE_SCHEMA
const dbuser = process.env.DATABASE_USERNAME
const dbpass = process.env.DATABASE_PASSWORD

let queryStr = "";

/*
 * Connect to Database with credentials from environment file
 */
let connection = mysql.createConnection({
    host: domain,
    user: dbuser,
    password: dbpass,
});

connection.connect(error => {
    if (error) throw error;
    console.log(`[${colors.green("success")}]\tConnection successfully!`);
});


/**
 * Query functions
 */

/**
 * Function to get data from the database
 * 
 * @param params param like: [param1, param2, param3]
 */
function get(params) {
    queryStr = "SELECT ";

    if (params.length != 0) {
        for (let i = 0; i < params.length; i++) {
            queryStr += params[i];

            if (i != params.length-1) {
                queryStr += ", ";
            }
        }
    } else {
        queryStr += "*";
    }

    queryStr += " FROM table";
    
    connection.query(queryStr, function(error, results, fields) {
        if (error) throw error;
        console.log("Query " + queryStr + " executed..");
    });
}


/**
 * @param params ; params is like: {
 *      item1: item2
 * }
 */
function insert(params) {
    queryStr = "INSERT INTO table ( "
    if (Object.values(params).length > 0) {
        for (let i = 0; i < Object.keys(object).length; i++) {
            queryStr += Object.keys(object)[i];
        }

        queryStr += ") VALUES (";

        for (let i = 0; i < Object.values(object).length; i++) {
            queryStr += `"${Object.values(object)[i]}"`;

            if (i != Object.values(object).length-1) {
                queryStr += ", ";
            } else {
                queryStr += ") ";
            }
        }
    } else {
        console.log(``);
        break;
    }
}


function update() {

}


function remove() {

}


function table() {

}

/**
 * 
 * @param params insert array like this: [1, '<>=', 2] 
 */
function where(params) {
    for (let param in params) {
        queryStr += param + " ";
    }
}


function go() {

}


/**
 * Export functions
 */
module.exports = {
    get,
    insert,
    update,
    remove,
    table,
    where
};