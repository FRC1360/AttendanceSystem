const express = require('express');
const app = express();
const cors = require('cors');
const chalk = require("chalk");
const databaseConnection = require("./utils/Database.js");
const userData = require("./schemas/User.js");
let whitelist = ['http://localhost:8080'];


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

app.get('/get/member/:name', async(req, res) => {
    userinfo = await findUser(req.params.name);
    return res.json(userinfo);
});

app.get('/get/subteam/:name', async(req, res) => {
    usersinfo = await findUsersBySubteam(req.params.name);
    return res.json(usersinfo);
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

app.listen(8080, async() => {
    console.log(`[${chalk.greenBright("BOOT")}] App listening on port 8080`);
    databaseConnection.execute();
    await console.log(await findUsersBySubteam('programming'))

});

async function findUser(name) {
        let usersData = await userData.findOne({ name: name });
        if (usersData) {
            return usersData;
        } else {
            usersData = new userData({ name: name });
            await usersData.save();
        }
}

async function findUsersBySubteam(subteam) {
    let usersData = await userData.find({ subteams: [subteam] });
    return usersData;
    
}

async function findUsersByJoinYear(year) {
    let usersData = await userData.find({ joinYear: year });
    return usersData;
    
}