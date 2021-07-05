import document from "document";
import * as messaging from "messaging";
import {grabToken} from "../companion/get-token";

let background = document.getElementById("background");

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
    let bruh = grabToken(code);
    console.log("Success " + bruh);
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
