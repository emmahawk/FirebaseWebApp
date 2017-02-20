/**
 * Created by Evan on 2/16/17.
 */

var firebase = require("firebase");
var util = require("util");
var nodeimu = require("nodeimu");
var IMU = new nodeimu.IMU();
var sense = require("sense-hat-led");

var light_r_value = 0;
var light_g_value = 0;
var light_b_value = 0;
var light_row_value = 0;
var light_column_value = 0;

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

function updateData() {
    // Timestamp data
    var d = new Date();
    var t = d.toLocaleTimeString();

    // Get data from sensors
    var data = IMU.getValueSync();
    var humidity = data.humidity.toFixed(4);
    var temperature = data.temperature.toFixed(4);

    // Write data to firebase
    firebase.database().ref().update({
        "Humidity": humidity,
        "Temperature": temperature
    });

    console.log("Updated firebase humidity data to " + humidity + " at " + t);
    console.log("Updated firebase temperature data to " + temperature + " at " + t);
}

function resetUpdateLightToFalse() {
    firebase.database().ref().update({
        "Update_Light": false
    });
}

// Initial database write
initializeFirebaseSchema(0, 0, 255, 255, 255, 0, 0, false);
sense.clear();
updateData();

// Call recurring function
var myVar = setInterval(function(){ updateData() }, 60000);





// ~~~~~~~~~~~~~~~ Light Data Listeners // ~~~~~~~~~~~~~~~

// Light_R is changed
firebase.database().ref().child("Light_R").on("value", function(snapshot) {
    //console.log("Light_R value changed to " + snapshot.val());
    light_r_value = snapshot.val();
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_G is changed
firebase.database().ref().child("Light_G").on("value", function(snapshot) {
    //console.log("Light_G value changed to " + snapshot.val());
    light_g_value = snapshot.val();
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_B is changed
firebase.database().ref().child("Light_B").on("value", function(snapshot) {
    //console.log("Light_B value changed to " + snapshot.val());
    light_b_value = snapshot.val();
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_Row is changed
firebase.database().ref().child("Light_Row").on("value", function(snapshot) {
    //console.log("Light_Row value changed to " + snapshot.val());
    light_row_value = snapshot.val();
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Light_Column is changed
firebase.database().ref().child("Light_Column").on("value", function(snapshot) {
    //console.log("Light_Column value changed to " + snapshot.val());
    light_column_value = snapshot.val();
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Update_Light is changed
firebase.database().ref().child("Update_Light").on("value", function(snapshot) {
    var valueData = snapshot.val();
    //console.log("Update_Light value changed to " + valueData);

    // Change light on SenseHat array if Update_Light is true
    if (valueData == true) {
        sense.setPixel(light_row_value, light_column_value, light_r_value, light_g_value, light_b_value);
        console.log("Changed light at (" + light_row_value + ", " + light_column_value + ")" + " to [" + light_r_value + ", " + light_g_value + ", " + light_b_value + "]");
        resetUpdateLightToFalse();
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});