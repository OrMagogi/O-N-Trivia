var config = require('./dbconfig')
var mysql = require('mysql');
var connection

//response coded
const NO_USER_FOUND = 1
const USER_ALREADY_REGISTERED = 2
const SIGNED_UP_SUCCESSFULY = 3
const GENERAL_ERROR = 4

async function connectToDB() {
    connection = mysql.createConnection(config)
    return new Promise((resolve, reject) => {
        connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                connection.end();
                reject(err);
            } else {
                console.log(" connected.");
                resolve()
            }
        });
    });
}

function disconnectFromDB() {
    connection.end();
}

async function getQuestions() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM trivia.questions ORDER BY RAND() limit 10', (error, results, fields) => {
            if (error) { reject(500) }
            else {
                resolve(results)
            }
        });
    });
}

async function getUserByUserNameAndPassword(userName, password) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT userName,maxScore FROM trivia.users WHERE userName='${userName}' AND password='${password}'`, (error, results, fields) => {
            if (error) { reject(GENERAL_ERROR) }
            else {
                resolve(results[0])
            }
        });
    });
}

async function signUpUser(userName, password) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO trivia.users (userName,password,maxScore) VALUES ('${userName}','${password}',0);`
            , (error, results, fields) => {
                if (error) {
                    let errorCode
                    if (error.errno == 1062) {
                        errorCode = USER_ALREADY_REGISTERED
                    } else {
                        errorCode = 500
                    }
                    reject(errorCode)

                } else {
                    resolve(SIGNED_UP_SUCCESSFULY)
                }
            });
    });
}

async function updateUserScore(userName, newScore) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE trivia.users SET maxScore='${newScore}' WHERE userName='${userName}';`, (error, results, fields) => {
            if (error) { reject(500) }
            else {
                resolve("New score is updated!")
            }
        });
    });
}

async function getTopScores() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT userName,maxScore FROM trivia.users order by maxScore DESC LIMIT 5`, (error, results, fields) => {
            if (error) { reject(500) }
            else {
                resolve(results)
            }
        });
    });
}


function test() {
    return "hiii"
}

module.exports = {
    test: test,
    connectToDB: connectToDB,
    disconnectFromDB: disconnectFromDB,
    getQuestions: getQuestions,
    getUserByUserNameAndPassword: getUserByUserNameAndPassword,
    updateUserScore: updateUserScore,
    signUpUser: signUpUser,
    getTopScores: getTopScores
}