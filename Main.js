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
    //messagingSenderId: "829587448861"
};

var raspberryPiApp = firebase.initializeApp(config);
var database = firebase.database();

console.log(raspberryPiApp.name);  // "[DEFAULT]"

console.log("Why yes, this is actually working.");

function writeData(humidity, temperature, light_r, light_g, light_b, light_row, light_column, update_light) {
    firebase.database().ref().set({
        humidity: humidity,
        temperature: temperature,
        light_r: light_r,
        light_g: light_g,
        light_b: light_b,
        light_row: light_row,
        light_column: light_column,
        update_light: update_light
    });
}