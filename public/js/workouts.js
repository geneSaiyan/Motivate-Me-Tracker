// Loading workouts 
  $.ajax({
      url: "/workouts",
      method: "GET",
      success: data => {
        renderWorkouts(data);
      }
  })

// Function to render exercises based on workout ID
function renderExercises(workout_id) {
  //remove previous workout routine
  $("#divExerciseList").html("");
  $.ajax({
      url: `/exercises/${workout_id}`,
      method: "GET",
      success: result => {
          for (exercise of result[0].exercises) {
              $("#divExerciseList").append(`
              <div class="col-3" style=" margin-top: 1%;">
              <div class="card" style="background-color: #B4EEB4;">
                  <div class="card-body">
                    <h6 class="card-title text-center">${exercise.exercise_name}</h6>
                    <p class="card-text text-center">Reps: ${exercise.num_of_reps}</p>
                  </div>
                </div>
          </div>
              `)
          }
      }
  })
}

// Function to create the add exercise form
function renderExerciseForm(workoutName) {
  $("#divLoadExercises").prepend(`
  <h2>Add Exercise to ${$(workoutName).text()}</h2>
  <form action="/addExercise" method="post">
      <div class="form-group>
          <label for="exerciseName">Name of Exercise</label>
          <input class="form-control" type="text" name="exerciseName" value="" placeholder="Exercise">
      </div>
      <div class="form-group">
          <label for="exerciseReps">Number of Reps</label>
          <input class="form-control" type="number" name="exerciseReps" min="0" value="" placeholder="# of Reps">
      </div>
      <button class="btn btn-primary" id="addExercise">Add Exercise</button>
  </form>
  <hr>
  `);
}

function renderWorkouts(data) {
  $("#divLoadWorkouts").html(` 
  <h3 style="padding-top:10px; text-align: center">Workout Log</h3>
  <p style="text-align:center">Click on a workout to update your exercises.</p>
  <hr style="border: 1px solid white">`)
  for (workout of data) {
      $("#divLoadWorkouts").append(`
<div style="text-align:center"><button class="btn btn-link whiteLink workoutBtn" value="${workout._id}" style="text-align:center">${workout.workout_name}</button></div>`);
  }
  $(".workoutBtn").click(event => {
      let workoutId = $(event.currentTarget).val();
      $("#divLoadExercises").html(`
      <div id="divExerciseList" class="row"></div>
      `)
      renderExerciseForm(event.currentTarget)
      renderExercises(workoutId)  
      $("#addExercise").click((event) => {
          event.preventDefault();
          let numReps = $("input[name*='exerciseReps']").val()
          let exerciseObject = {
            workoutId: workoutId,
              exercise_name: $("input[name*='exerciseName']").val().trim(),
              num_of_reps: (numReps > 0) ? numReps : undefined
          }
          console.log(exerciseObject)
          $.ajax({
              url: "/addExercise",
              data: exerciseObject,
              method: "POST",
              success: result => {
                  if (result.errors != undefined) {
                      if (result.errors.exercise_name) {
                          alert("Please enter a name")
                      } else if (result.errors.num_of_reps) {
                         alert("Please enter number of reps")
                      }
                  } else {
                      renderExercises(result._id);
                  }
              }
          })
      })
  })
}


// Function used to load previous workout data
// function loadWorkouts() {
//   fetch("/workouts")
//     .then(function (response) {
//       if (response.status !== 200) {
//         console.log("Looks like there was a problem. Status Code: " + response.status);
//         return;
//       }
    
//       response.json().then(function (data) {

//           for (i = 0; i < data.length; i++) {
//             // Creating a variable to use the workout name as unique IDs
//             var workoutName = data[i].workout_name;
//             var combinedWorkoutName = workoutName.split(/\s/).join('');
//             var workoutID = data[i]._id;
  
//             var linkButton = $(`<div style="text-align:center"><button class="btn btn-link whiteLink" style="text-align:center" data-toggle="modal" data-target="#${combinedWorkoutName}">${data[i].workout_name}</button></div>`);
//             var modal = $(`
         
//             <div class="modal fade" id="${combinedWorkoutName}" tabindex="-1" role="dialog" aria-labelledby="lbl${combinedWorkoutName}" aria-hidden="true">
//               <div class="modal-dialog modal-lg" role="document">
//                 <div class="modal-content">
//                   <div class="modal-header">
//                     <h4 class="modal-title" id="lbl${combinedWorkoutName}" style="color:black;">Workout Routine: ${data[i].workout_name}</h4>
//                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                       <span aria-hidden="true">&times;</span>
//                     </button>
//                   </div>
//                   <div class="modal-body">
                
//                   <h5 style="color:black">Add new exercise</h5>
//                   <div class="form-group>
//                       <label for="exercise_name" style="color:black">Name of Exercise:</label>
//                       <input class="form-control" type="text" id="exercise_name${workoutID}" name="exercise_name" placeholder="Exercise">
//                   </div>
//                   <div class="form-group">
//                       <label for="num_of_reps" style="color:black">Number of Reps:</label>
//                       <input class="form-control" type="number" id="num_of_reps${workoutID}" name="num_of_reps" placeholder="# of Reps">
//                   </div>
//                   <button class="btn btn-primary btnAddExercise" id="addExercise" data-id='${workoutID}'>Add Exercise</button>
  
//               <hr>
//               <div id="exerciseSection">
              
//               </div>
//                   </div>
                
//                 </div>
//               </div>
//             </div>
//             `)
  
//             divLoadWorkouts.append(linkButton, modal);
//           }
       

//         // Button click to add exercise to workout routine
//         $(".btnAddExercise").click(function (event) {
//           event.preventDefault();

//           var workoutId = $(this).data("id");
//           var exercise_name = $("#exercise_name" + workoutId).val();
//           var num_of_reps = $("#num_of_reps" + workoutId).val();
//           var exerciseObject = { workoutId: workoutId, exercise_name: exercise_name, num_of_reps: num_of_reps };

//           $.ajax({
//             url: "/addExercise",
//             data: exerciseObject,
//             method: "POST",
//             success: () => {
//               console.log('SUCCESS!')
//             },
//             error: err => {
//               console.log(err);
//             }
//           });
//         })
//       });


//     })
//     .catch(function (err) {
//       console.log("Fetch Error :-S", err);
//     });

// }

// loadWorkouts();
