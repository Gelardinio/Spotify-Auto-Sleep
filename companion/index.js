import * as messaging from "messaging";
import { settingsStorage } from "settings";
import {grabToken, getter} from "../companion/get-token";

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

settingsStorage.onchange = async (evt) => {
  if (evt.key === "code" && evt.newValue) {
    let code = evt.newValue;
    let token = await grabToken(code);
    let pauser = await getter(token.access_token, "PUT", "/player/pause");
    console.log(pauser);
    let user = await getter(token.access_token, "GET", "");
    console.log(user);
  }
}

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
