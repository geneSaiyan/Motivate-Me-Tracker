const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Exercise schema
const exerciseSchema = new Schema({
    exercise_name: {
        type: String,
        required: true
    },
    num_of_reps: {
        type: Number,
        required: true
    }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;