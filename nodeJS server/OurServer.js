"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dboperations_1 = __importDefault(require("./dboperations"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const port = 5000;
//CORS adapter
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.get('/getQuestions', (req, res) => {
    dboperations_1.default.getQuestions().then((result) => {
        let questionsArray = [];
        result.forEach(element => {
            console.log("element.question= " + element.question);
            questionsArray.push(element.question);
        });
        res.send(questionsArray);
    }).catch(() => {
        res.sendStatus(500);
        console.log("could not connect to db");
    });
});
//done
app.post('/getUserByUserNameAndPassword', (req, res) => {
    console.log("getting post request");
    dboperations_1.default.getUserByUserNameAndPassword(req.body.userName, req.body.password).then((result) => {
        res.send(result);
    }).catch((errorCode) => {
        res.send({ 'errorCode': errorCode });
        console.log("could not find user");
    });
});
app.post('/updateUserScore', (req, res) => {
    console.log("updating user score: ");
    dboperations_1.default.updateUserScore(req.body.userName, req.body.newHighScore).then((result) => {
        res.send({ 'result': result });
    }).catch((errorMessage) => {
        res.send({ 'result': errorMessage });
        console.log("could not find user");
    });
});
//done
app.post('/signUpUser', (req, res) => {
    dboperations_1.default.signUpUser(req.body.userName, req.body.password).then((resultCode) => {
        console.log("Signed up successfuly");
        res.send({ 'result': resultCode });
    }).catch((errorCode) => {
        res.send({ 'errorCode': errorCode });
        console.log("Could not register");
    });
});
app.get('/getTopScores', (req, res) => {
    dboperations_1.default.getTopScores().then((result) => {
        res.send(result);
    }).catch(() => {
        res.sendStatus(500);
        console.log("could not connect to db");
    });
});
app.listen(port, () => {
    dboperations_1.default.connectToDB().then(() => {
        console.log("Server is running");
    }).catch((error) => {
        console.log("could not connect to db");
    });
});
process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    // some other closing procedures go here
    dboperations_1.default.disconnectFromDB();
    process.exit();
});
