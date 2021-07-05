import { clientId, clientSecret,  scopes} from "../common/spotifydata";

export const encoder = function (params) {
    let final = [];
    for (let element in params) {
        let encodedKey = encodeURIComponent(element);
        let encodedValue = encodeURIComponent(params[element]);
        final.push(encodedKey + "=" + encodedValue);
    }
    final = final.join("&");
    console.log("This is final: " + final);
    return final;
}