$("#btnAddWorkout").click(function(){
    event.preventDefault();

    // Creating workoutData variable to store object for inserting data
    var workoutData = {};
    workoutData.workout_name = $("#workout_name").val();
    workoutData.created = Date.now();

    // Calling submitWorkout api to insert a new Document in the Workouts collection
    fetch("/submitWorkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData)
      });

      $("#addAlert").fadeIn();
      $("#addAlert").fadeOut(4000);
    console.log(workoutData)
})

// Function used to load previous workout data
function loadWorkouts() {
  fetch("/workouts")
        .then(function(response) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return;
            }
            response.json().then(function(data) {
              for(i = 0; i < data.length; i++){
                console.log(data[i].workout_name);
              }
                
            });
        })
        .catch(function(err) {
            console.log("Fetch Error :-S", err);
        });
}

loadWorkouts();