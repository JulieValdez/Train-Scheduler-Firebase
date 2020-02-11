// variable to hold database info and initialize database
// create button click listener to add the train information
// capture the info from the input form and save it to the database
// use the database info and update the table
// calculate the time of the next train

var firebaseConfig = {
  apiKey: "AIzaSyBzQx62DI4dlCsh3ui0IunZm5mLMzuE9sQ",
  authDomain: "first-firebase-project-8ff4d.firebaseapp.com",
  databaseURL: "https://first-firebase-project-8ff4d.firebaseio.com",
  projectId: "first-firebase-project-8ff4d",
  storageBucket: "first-firebase-project-8ff4d.appspot.com",
  messagingSenderId: "419297304139",
  appId: "1:419297304139:web:51e68d7f8320580a2877ce"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// submit button for adding train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input")
    .val()
    .trim();
  var trainDestination = $("#destination-input")
    .val()
    .trim();
  var trainTime = $("#train-time-input")
    .val()
    .trim();
  var trainFrequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});
