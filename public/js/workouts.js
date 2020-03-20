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

          var linkButton = $(`<button class="btn btn-link whiteLink">${data[i].workout_name}</button><br>`);

          divLoadWorkouts.append(linkButton);
          //noteListItems.push($li);
        }

      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

loadWorkouts();