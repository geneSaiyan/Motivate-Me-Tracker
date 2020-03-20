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