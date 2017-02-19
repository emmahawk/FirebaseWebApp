/**
 * Created by Evan on 2/16/17.
 */

var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDtCe7bIQCiLI75R3MLoEWufDwK_TOldS4",
    authDomain: "iot-lab-2-7359b.firebaseapp.com",
    databaseURL: "https://iot-lab-2-7359b.firebaseio.com",
    storageBucket: "iot-lab-2-7359b.appspot.com",
    messagingSenderId: "829587448861"
};
firebase.initializeApp(config);

function initializeFirebaseSchema(humidity, temperature, light_r, light_g, light_b, light_row, light_column, update_light) {
    firebase.database().ref().set({
        Humidity: humidity,
        Temperature: temperature,
        Light_R: light_r,
        Light_G: light_g,
        Light_B: light_b,
        Light_Row: light_row,
        Light_Column: light_column,
        Update_Light: update_light
    });
}

// Initial database write
initializeFirebaseSchema(0, 0, 255, 255, 255, 0, 0, false);

function updateData(humidity, temperature) {
    firebase.database().ref().update({
        "Humidity": humidity,
        "Temperature": temperature
    });
}

var myVar = setInterval(function(){ recurringFunction() }, 5000);

function recurringFunction() {
    // Timestamp data
    var d = new Date();
    var t = d.toLocaleTimeString();

    // Get data from sensors

    // Write data to firebase
    updateData(0, 0);

    console.log("Updated firebase data at " + t);
}

// Light_R is changed
firebase.database().ref().child("Light_R").on("value", function(snapshot) {
    console.log("Light_R value changed to " + snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_G is changed
firebase.database().ref().child("Light_G").on("value", function(snapshot) {
    console.log("Light_G value changed to " + snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_B is changed
firebase.database().ref().child("Light_B").on("value", function(snapshot) {
    console.log("Light_B value changed to " + snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_Row is changed
firebase.database().ref().child("Light_Row").on("value", function(snapshot) {
    console.log("Light_Row value changed to " + snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_Column is changed
firebase.database().ref().child("Light_Column").on("value", function(snapshot) {
    console.log("Light_Column value changed to " + snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Update_Light is changed
firebase.database().ref().child("Update_Light").on("value", function(snapshot) {
    console.log("Update_Light value changed to " + snapshot.val());
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});