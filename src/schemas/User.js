const { Schema, model } = require("mongoose");

module.exports = model("User", new Schema({
	name: { type: String },
	subteams: { type: Array, default: [] },
	joinYear: { type: Number, default: (new Date()).getFullYear() },
	isLead: { type: Boolean, default: false },
	attendance: { type: Array, default: [] }
    /*
    {
        "date": "2022-07-28",
        "attended": true
    }
    */
}));