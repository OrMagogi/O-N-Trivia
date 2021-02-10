import express, { Application, request, Request, Response } from 'express'
import dboperations from './dboperations'
import bodyParser from "body-parser"

const app: Application = express()
const port = 5000



//CORS adapter
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/getQuestions', (req: Request, res: Response) => {
    dboperations.getQuestions().then((result: any[]) => {

        let questionsArray: JSON[] = []
        result.forEach(element => {
            console.log("element.question= " + element.question);
            questionsArray.push(element.question)
        });

        res.send(questionsArray)
    }).catch(() => {
        res.sendStatus(500)
        console.log("could not connect to db")
    });
})

//done
app.post('/getUserByUserNameAndPassword', (req: Request, res: Response) => {
    console.log("getting post request");
    dboperations.getUserByUserNameAndPassword(req.body.userName, req.body.password).then((result: any[]) => {
        res.send(result)
    }).catch((errorCode) => {
        res.send({ 'errorCode': errorCode })
        console.log("could not find user")
    });
})


app.post('/updateUserScore', (req: Request, res: Response) => {
    console.log("updating user score: ");
    
    dboperations.updateUserScore(req.body.userName, req.body.newHighScore).then((result: any[]) => {
        res.send({ 'result': result })
    }).catch((errorMessage) => {
        res.send({ 'result': errorMessage })
        console.log("could not find user")
    });
})

//done
app.post('/signUpUser', (req: Request, res: Response) => {
    dboperations.signUpUser(req.body.userName, req.body.password).then((resultCode: number) => {
        console.log("Signed up successfuly");
        res.send({ 'result': resultCode })
    }).catch((errorCode) => {
        res.send({ 'errorCode': errorCode })
        console.log("Could not register")
    });
})

app.get('/getTopScores', (req: Request, res: Response) => {
    dboperations.getTopScores().then((result: any[]) => {
        res.send(result)
    }).catch(() => {
        res.sendStatus(500)
        console.log("could not connect to db")
    });
})
app.get('/test', (req: Request, res: Response) => {
        res.send("Welcome alladin")

})

// app.listen(port, () => {
//     dboperations.connectToDB().then(() => {
//         console.log("Server is running")
//     }).catch((error) => {
//         console.log("could not connect to db")
//     });
// })

app.listen(process.env.PORT || port, () => {
    dboperations.connectToDB().then(() => {
        console.log("Server is running")
    }).catch((error) => {
        console.log("could not connect to db")
    });
})

process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    // some other closing procedures go here
    dboperations.disconnectFromDB()
    process.exit();
})


