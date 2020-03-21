var divLoadWorkouts = $("#divLoadWorkouts");

// Function used to load previous workout data
function loadWorkouts() {
  fetch("/workouts")
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }
      response.json().then(function (data) {
        for (i = 0; i < data.length; i++) {
          console.log(data[i].workout_name);

          // Creating a variable to use the workout name as unique IDs
          var workoutName = data[i].workout_name;
          const combinedWorkoutName = workoutName.split(/\s/).join('');

          var linkButton = $(`<div style="text-align:center"><button class="btn btn-link whiteLink" style="text-align:center" data-toggle="modal" data-target="#${combinedWorkoutName}">${data[i].workout_name}</button></div>`);
          var modal = $(`
       
          <div class="modal fade" id="${combinedWorkoutName}" tabindex="-1" role="dialog" aria-labelledby="lbl${combinedWorkoutName}" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="lbl${combinedWorkoutName}" style="color:black">Workout Routine: ${data[i].workout_name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <form action="/add" method="post">
                <h5 style="color:black">Add new exercise</h5>
                <div class="form-group>
                    <label for="exercise_name" style="color:black">Name of Exercise:</label>
                    <input class="form-control" type="text" name="exercise_name" value="" placeholder="Exercise">
                </div>
                <div class="form-group">
                    <label for="num_of_reps" style="color:black">Number of Reps:</label>
                    <input class="form-control" type="number" name="num_of_reps" value="" placeholder="# of Reps">
                </div>
                <button class="btn btn-primary" id="addExercise">Add to Exercise</button>
            </form>
            <hr>
            <h5 style="color:black">Exercises performed</h5>
                </div>
              
              </div>
            </div>
          </div>
          `)

          divLoadWorkouts.append(linkButton, modal);
          // linkButton.append(modal);
          //noteListItems.push($li);
        }

      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

loadWorkouts();