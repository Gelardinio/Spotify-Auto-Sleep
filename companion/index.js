import * as messaging from "messaging";
import { settingsStorage } from "settings";
import {grabToken, getter, grabRefresh} from "../companion/get-token";

let refreshKey;


messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

messaging.peerSocket.onmessage = evt => {
  if (evt.data.key == "sleep" && evt.data.newValue == "yes") {
    let pauser = await getter(refreshKey, "PUT", "/player/pause");
    console.log("Pause status " + pauser);
  }
};

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
    settingsStorage.setItem('rToken', token.refresh_token);
    let data = {
      key: "rToken",
      newValue: token.refresh_token
    }
    sendVal(data);
  }
}

function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
      if (key == "rToken") {
        let refreshToken = settingsStorage.getItem(key);
        setInterval(function(){ 
        (async () => {
          let aToken = await grabRefresh(refreshToken);
          refreshKey = aToken.access_token;
        })()
        }, 1800000);
      }
    }
  }
}

function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}


