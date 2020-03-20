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

// Testing exercise table
// db.Exercise.create({ exercise_name: "Bench Press", num_of_reps: "4" })
//   .then(dbExercise => {
//     console.log(dbExercise);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });


// app.get("/user", (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });



// app.get("/populateduser", (req, res) => {
//   db.User.find({})
//     .populate("notes")
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
