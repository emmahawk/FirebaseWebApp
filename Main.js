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
var database = firebase.database();

console.log(firebase.name);  // "[DEFAULT]"

console.log("Why yes, this is actually working.");

function writeData(humidity, temperature, light_r, light_g, light_b, light_row, light_column, update_light) {
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

writeData(0, 0, 255, 255, 255, 0, 0, false);
