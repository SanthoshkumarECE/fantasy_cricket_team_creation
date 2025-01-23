const mongoose = require("mongoose");
let moment = require('moment');
const userSchema = new mongoose.Schema({
    
    selectedteam: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
            points: { type: String, required: true },
        },
        
    ],
    createdAt: {
        type: String,
        default: () => moment().format("hh:mm:ss a"),
    },
});

const selectedplayers = mongoose.model("selectedplayers",userSchema);

module.exports = selectedplayers;
