import document from "document";
import * as messaging from "messaging";
import {grabToken, grabRefresh} from "../companion/get-token";
import sleep from "sleep"

if (sleep) {
  sleep.onchange = () => {
      console.log("User is asleep");
      data = {
        key: "sleep",
        newValue: "yes"
      }
      sendVal(data);
  }
} else {
  console.log("Sleep API not supported on this device, or no permission")
}

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "code" && evt.data.newValue) {
    let code = evt.data.newValue;
    console.log("This is the code: " + code);
    let access = grabToken(code.access_token);
    console.log("Success " + access);
  } 
  if (evt.data.key === "rToken" && evt.data.newValue) {
    let rToken = evt.data.newValue;
    console.log(`New refresh token: ${rToken}`);
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

function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
    console.log("Sent");
  } 
  else {
    console.log("Error");
  }
}

