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
            console.log(data[i].exercises);
            
            // Creating a variable to use the workout name as unique IDs
            var workoutName = data[i].workout_name;
            var combinedWorkoutName = workoutName.split(/\s/).join('');
            var workoutID = data[i]._id;
  
            var linkButton = $(`<div style="text-align:center"><button class="btn btn-link whiteLink" style="text-align:center" data-toggle="modal" data-target="#${combinedWorkoutName}">${data[i].workout_name}</button></div>`);
            var modal = $(`
         
            <div class="modal fade" id="${combinedWorkoutName}" tabindex="-1" role="dialog" aria-labelledby="lbl${combinedWorkoutName}" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="lbl${combinedWorkoutName}" style="color:black;">Workout Routine: ${data[i].workout_name}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                
                  <h5 style="color:black">Add new exercise</h5>
                  <div class="form-group>
                      <label for="exercise_name" style="color:black">Name of Exercise:</label>
                      <input class="form-control" type="text" id="exercise_name${workoutID}" name="exercise_name" placeholder="Exercise">
                  </div>
                  <div class="form-group">
                      <label for="num_of_reps" style="color:black">Number of Reps:</label>
                      <input class="form-control" type="number" id="num_of_reps${workoutID}" name="num_of_reps" placeholder="# of Reps">
                  </div>
                  <button class="btn btn-primary btnAddExercise" id="addExercise" data-id='${workoutID}'>Add Exercise</button>
  
              <hr>
              <h5 style="color:black">Exercises performed</h5>
              <div id="exerciseSection">
              <p><a href="/exercise">See your library!</a></p>
              </div>
                  </div>
                
                </div>
              </div>
            </div>
            `)
  
            divLoadWorkouts.append(linkButton, modal);
          }
       

        // Button click to add exercise to workout routine
        $(".btnAddExercise").click(function (event) {
          event.preventDefault();

          var workoutId = $(this).data("id");
          var exercise_name = $("#exercise_name" + workoutId).val();
          var num_of_reps = $("#num_of_reps" + workoutId).val();
          var exerciseObject = { workoutId: workoutId, exercise_name: exercise_name, num_of_reps: num_of_reps };

          $.ajax({
            url: "/addExercise",
            data: exerciseObject,
            method: "POST",
            success: () => {
              console.log('SUCCESS!')
            },
            error: err => {
              console.log(err);
            }
          });
        })
      });


    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });

  // $("#btnAddExercise").click(function(){

  //  console.log('love')

  // })
}

loadWorkouts();

// function loadExercises(){
//   fetch("/exercises")
//   .then(function (response) {
//     if (response.status !== 200) {
//       console.log("Looks like there was a problem. Status Code: " + response.status);
//       return;
//     }
//     response.json().then(function (data) {
//       for (i = 0; i < data.length; i++) {
//         console.log(data[i]);
//       }
//     });
  
//   })
//   .catch(function (err) {
//     console.log("Fetch Error", err);
//   });
// }

// loadExercises();
