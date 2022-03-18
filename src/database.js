const mysql = require("mysql");
const colors = require("colors");
const filesystem = require("fs");
const e = require("express");

/**
 * Load values fron environment file
 */
require("dotenv").config({
    path: filesystem.readFileSync(".env", "utf8"),
});

// const domain = process.env.DATABASE_DOMAIN
// const schema = process.env.DATABASE_SCHEMA
// const dbuser = process.env.DATABASE_USERNAME
// const dbpass = process.env.DATABASE_PASSWORD

// TODO: Please obfuscate immediately
const domain = "127.0.0.1";
const schema = "landserver";
const dbuser = "niko";
const dbpass = "henkdepotvis";

let queryStr = "";
let whereStr = "";
let tableStr = "";
let whereCount = 0;

/*
 * Connect to Database with credentials from environment file
 */
let connection = mysql.createConnection({
    host: domain,
    user: dbuser,
    password: dbpass,
    database: schema,
    insecureAuth : false,
});

connection.connect(error => {
    if (error) throw error;
    console.log(`[${colors.green("SUCCESS")}]\tConnection successfully!`);
});


/**
 * Query functions
 */

/**
 * Function to get data from the database
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

    if (tableStr.length == 0) {
        console.log(`[${colors.red("ERROR")}]\tEr is geen table naam toegevoegd!`);
        return;
    }

    queryStr += " FROM " + tableStr + " " + whereStr + " ;";
}


/**
 * @param params ; params is like: {
 *      item1: item2
 * }
 */
function insert(params) {
    if (tableStr.length == 0) {
        console.log(`[${colors.red("ERROR")}]\tEr is geen table naam toegevoegd!`);
        return;
    }

    queryStr = "INSERT INTO " + tableStr + " ( ";
    objectKeys = Object.keys(params);
    objectValues = Object.values(params);

    if (objectKeys.length > 0 && objectValues.length > 0) {
        for (let i = 0; i < objectKeys.length; i++) {
            queryStr += objectKeys[i];

            if (i != objectKeys.length-1) {
                queryStr += ", ";
            }
        }

        queryStr += ") VALUES (";

        for (let i = 0; i < objectValues.length; i++) {
            queryStr += `"${objectValues[i]}"`;

            if (i != objectValues.length-1) {
                queryStr += ", ";
            } else {
                queryStr += ");";
            }
        }
    } else {
        console.log(``);
        return;
    }
}


/**
 * Function to build the update query
 * @param params
 * params value is like:
 * { 
 * key1: '', 
 * key2: '',
 * ...,
 * keyn: '',
 * }
 * 
 * Keys must be the columnnames
 * 
 * Values can be the datatypes of the specific column 
 */
function update(params) {
    if (tableStr.length == 0) {
        console.log(`[${colors.red("ERROR")}]\tEr is geen table naam toegevoegd!`);
        return;
    }

    queryStr = "UPDATE " + tableStr + " SET ";
    objectKeys = Object.keys(params);
    objectValues = Object.values(params);

    if (objectKeys.length > 0 && objectValues.length > 0) {
        for (let i = 0; i < objectKeys.length; i++) {
            queryStr += `${objectKeys[i]} = "${objectValues[i]}"`;
    
            if (i != objectKeys.length) {
                queryStr += ", ";
            }
        }
    
        queryStr += " " + whereStr + ";";
    } else {
        return;
    }
}


/**
 * Function for removing data from the database
 */
function remove() {
    queryStr = "DELETE FROM " + tableStr + " " + whereStr;
}


/**
 * Function for setting the table name
 * @param table
 */
function table(table) {
    tableStr = table;
}


/**
 * Function to build the where query
 * 
 * @param params insert array like this:
 * [1, 2, 3]
 * 1 Value, can be either a integer or a string 
 * 2 operator, choose from ( = | < | > | <> )
 * 3 value, can be either integer, string, float or bool
 */
function where(params) {
    if (whereCount > 0) {
        whereStr += " AND ";
    } else {
        whereStr = "WHERE ";
    }

    for (let i = 0; i < param.length; i++) {
        whereStr += param[i] + " ";
    }
}


/**
 * Function for running the query
 * 
 * @return Mysql promises
 */
function transaction() {
    console.log(`[${colors.blue("INFO")}]\t\tQuery: ${colors.magenta(queryStr)} executed!`);

    return new Promise((resolve, reject) => {
        connection.query(queryStr, function(error, results, fields) {
            if (error) reject(error);
            resolve(results);
            dispose(); // Empties variables for the querybuilder 
        });
    });
}


/**
 * Function to dispose values of some vars
 */
function dispose() {
    queryStr = "";
    tableStr = "";
    whereStr = "";
    whereCount = 0;
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
    where,
    transaction
};