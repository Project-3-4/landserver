const mysql = require("mysql");
const colors = require("colors");
const { param } = require("express/lib/request");

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
let whereStr = "";
let tableStr = "";

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

    if (tableStr.length == 0) {
        console.log(`[${colors.red("error")}]\tEr is geen table naam toegevoegd!`);
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
        console.log(`[${colors.red("error")}]\tEr is geen table naam toegevoegd!`);
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
 * 
 * @param params
 */
function update(params) {
    if (tableStr.length == 0) {
        console.log(`[${colors.red("error")}]\tEr is geen table naam toegevoegd!`);
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
 * 
 * @param table
 */
function table(table) {
    tableStr = table;
}

/**
 * Function to build the
 * 
 * @param params insert array like this: [1, '<>=', 2] 
 */
function where(params) {
    whereStr = "WHERE ";

    for (let i = 0; i < param.length; i++) {
        whereStr += param[i] + " ";
    }
}


/**
 * Function for running the query
 */
function transaction() {
    connection.query(queryStr, function(error, results, fields) {
        if (error) throw error;
        console.log("Query " + queryStr + " executed..");
    });
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