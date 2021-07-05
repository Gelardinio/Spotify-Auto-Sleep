import { clientId, clientSecret,  scopes} from "../common/spotifydata";
import { encoder } from "../companion/authorization";

export const grabToken = async function (code) {

    const tokenParameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + 'Yzk1MzFiNGIwNWVmNDU3ZmI1MGMyZGUwNTE5MTg3ZDI6OWNmYTg5YTVlODM1NGQ3MGExNjRmZGQyNWM1YWRjOGI=',
        },
        body: encoder({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: 'https://app-settings.fitbitdevelopercontent.com/simple-redirect.html',
        })
    };

    return await fetch('https://accounts.spotify.com/api/token', tokenParameters)
        .then(function(data) {
            return data.json();
        }).catch(function(err) {
            console.log("error" + err);
        })

}