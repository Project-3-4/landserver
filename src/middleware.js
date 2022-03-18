const database = require("./database");
const colors = require("colors");

/**
 * Global variables
 */
let bankRegister = [];
let bankBlacklist = [];
let apiEndpoint = `
[
    {
        target: {
          	toCountry: "",
          	fromCountry: "",
          	toBank: "",
          	fromBank: ""
        },
        user: {
            username: "",
            email: "",
            IBAN: "",        
        },
        balance: {
            requested: 0.00,
            withdraw: 0.00,
            current: 0.00,
        },
        encryption: {
          	type: "",
         	seed: "",
         	certificate: "",
          	used: false
        },
	  server: {
            redirect: "",
            origin: "",
            target: "",
        },
        state: {
          	registered: false,
          	blacklisted: false,
          	message: "",
          	failed: false,
          	success: false,
          	inprogress: false,
        }
    }
]
`;


/**
 * 
 * @param {*} bank 
 * @returns 
 */
function addBankToBlacklist(bank) {
    if (bank.length <= 0) {
        return;
    }

    bankBlacklist.push("bank");
}


/**
 * 
 * @param bank 
 * @returns 
 */
function removeBankFromBlacklist(bank) {
    if (bank.length <= 0) {
        return;
    }

    bankBlacklist.pop(bank);
}


/**
 * 
 * @param bank 
 * @returns true | false 
 */
function checkIfBankInBlacklist(bank) {
    return bankBlacklist.includes(bank);
}


/**
 * 
 * @param bank 
 */
function addBankToRegister(bank) {
    if (bank.length === 0 || bankRegister.includes(bank))
        return;
    bankRegister.push(bank);
}


/**
 * 
 * @param bank 
 */
function removeBankFromRegister(bank) {
    if (bank.length <= 0) {
        return;
    }

    bankRegister.pop(bank);
}


