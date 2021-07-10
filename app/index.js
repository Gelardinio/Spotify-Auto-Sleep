import document from "document";
import * as messaging from "messaging";
import {grabToken, grabRefresh} from "../companion/get-token";
import sleep from "sleep"

let background = document.getElementById("background");

if (sleep) {
  sleep.onchange = () => {
      console.log(`User sleep state is: `)
  }
} else {
  console.log("Sleep API not supported on this device, or no permission")
}

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting background color: ${color}`);
    background.style.fill = color;
  } 
  if (evt.data.key === "oauth" && evt.data.newValue) {
    let ouath = evt.data.newValue;
    console.log(`Setting background oauth: ${ouath}`);
  } 
  if (evt.data.key === "code" && evt.data.newValue) {
    let code = evt.data.newValue;
    console.log("This is the code: " + code);
    let bruh = grabToken(code.access_token);
    console.log("Success " + bruh);
  } 
  if (evt.data.key === "rToken" && evt.data.newValue) {
    let rToken = evt.data.newValue;
    console.log(`NEW VALUE: ${rToken}`);
  } 
};
// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};

