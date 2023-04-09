const express = require('express');
const app = express();
const cors = require('cors');
const database = require("mongoose");
const chalk = require("chalk");

database.connect("mongodb+srv://admin:389179@cluster0.vccaflc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

database.connection.on("connected", () => {
    console.log(`[${chalk.greenBright("BOOT")}] Connected to MongoDB!\n`);
});

database.connection.on("err", err => {
    console.log(`[${chalk.redBright("ERROR")}] Unable to connect to the MongoDB. Error:\n${err}\n`);
});

database.connection.on("disconnected", () => {
    console.log(`[${chalk.blueBright("INFO")}] MongoDB connection is disconnected\n`);
});

let whitelist = ['http://localhost:8080']

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var message = "The CORS policy for this origin doesn't " +
                'allow access from the particular origin.';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    }
}));

app.get('/info', (req, res) => {
    return res.json({});
});

app.get('/', (req, res) => {
    return res.json({
        "message": "Nothing to see here!"
    });
});

app.use((req, res, next) => {
    let json = {
        "error": "invalid_endpoint",
        "code": 404
    }
    res.status(404).json(json);
});

app.listen(8080, () => {
    console.log(`[${chalk.greenBright("BOOT")}] App listening on port 8080`)
});
