const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating workout schema
const workoutSchema = new Schema({
    workout_name: {
        type: String,
        unique: true,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
