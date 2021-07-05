import { clientId, clientSecret,  scopes} from "../common/spotifydata";

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Demo Settings</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Spotify Login"
          label="Spotify"
          status="Login"
          authorizeUrl="https://accounts.spotify.com/authorize"
          requestTokenUrl="https://accounts.spotify.com/api/token"
          redirect_url = "https://app-settings.fitbitdevelopercontent.com/simple-redirect.html"
          clientId={clientId}
          clientSecret={clientSecret}
          scope={scopes}
          onReturn={(data) => {
            console.log('bruh ' + data.code)
            props.settingsStorage.setItem('code', data.code)
            props.settingsStorage.setItem('state', data.state)
          }}
        />
        <Toggle
          settingsKey="toggle"
          label="Toggle Switch"
        />
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: "tomato"},
            {color: "sandybrown"},
            {color: "#FFD700"},
            {color: "#ADFF2F"},
            {color: "deepskyblue"},
            {color: "plum"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
