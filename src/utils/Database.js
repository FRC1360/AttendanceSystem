const database = require("mongoose");
const chalk = require("chalk");

module.exports = {
    execute: async function() {
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
            console.log(`[${chalk.blueBright("INFO")}] MongoDB connection disconnected\n`);
        });        
    }
};