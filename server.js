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

app.get("/workouts", (req, res) => {
  db.Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
