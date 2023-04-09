const express = require('express');
const app = express();
const cors = require('cors');
const request = require('node-fetch');

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
    console.log(`App listening on port 8080`)
});
