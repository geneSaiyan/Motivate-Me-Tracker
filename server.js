const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessTrackerDB", { useNewUrlParser: true });

// api call to create a new workout
app.post("/submitWorkout", ({ body }, res) => {
  db.Workout.create(body)
    .then(({ _id }) => db.Exercise.findOneAndUpdate({}, { $push: { workout_name: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// api call to render workouts 
app.get("/workouts", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// api call to create add exercises to a workout
app.post("/addExercise", async (req, res) => {
  let exerciseInfo = {
    exercise_name: req.body.exercise_name,
    num_of_reps: req.body.num_of_reps
  }
  const newExercise = new db.Exercise(exerciseInfo)
  try {
    let addExercise = await db.Exercise.create(newExercise)
    try {
      var dbRoutine = await db.Workout.findOneAndUpdate({ _id: req.body.workoutId }, { $push: { exercises: addExercise._id } }, { new: true })
     
      res.status(200).send(dbRoutine);
    } catch (err) {
      res.status(200).send(err);
    }
  } catch (err) {
    res.status(200).send(err);
  }
});

// GET brings back all exercises from the workout
app.get("/exercises", (req, res) => {
  db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
