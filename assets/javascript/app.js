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

  // takes values from input form
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

  // new variable with values
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };
  // push that variable to the firebase database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
  // this worked
  // clears out the input values after the submit button is clicked
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");
});
// will update the database everytime a new train"child" is added grabs those values and creates new snapshots with the newest info
database.ref().on("child_added", function(childSnapshot) {
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // using moment to convert train time to format
  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  // holding current time
  var currentTime = moment();
  // difference between current time and the train time so that we can know when the next train is coming in minutes
  var diffTime = moment(currentTime).diff(
    moment(trainTimeConverted),
    "minutes"
  );
  // using the frequency of the train and the difference in minutes between current time and train time to find the remainder of minutes until the next train
  var timeRemainder = diffTime % trainFrequency;
  // remainder of time is subtracted from frequency to give minutes until the next train
  var minutesAway = trainFrequency - timeRemainder;
  // next train time uses current time and adds the minutesAway to get next time
  var nextTrain = moment()
    .add(minutesAway, "minutes")
    .format("HH:mm");

  var trainTableRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesAway)
  );
  $("#train-schedule > tbody").append(trainTableRow);
});
