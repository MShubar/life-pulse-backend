const mongoose = require("mongoose");


const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
});

Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
//sample
// {
//     name: "John Doe",
//     email: "s0K0e@example.com",
//     number: "1234567890",
//     score: 0
// }
// sample for score
// {
//     score: 0
// }