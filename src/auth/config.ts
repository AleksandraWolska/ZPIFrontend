export const oidcConfig =
  process.env.NODE_ENV === "development"
    ? {
        authority: "http://localhost:4000/realms/myrealm",
        client_id: "myclient",
        redirect_uri: "http://localhost:5173/secret",
        scope: "openid",
        onSigninCallback: () => {
          window.history.replaceState({}, document.title, window.location.pathname);
        },
      }
    : {
        authority: "http://130.61.252.200:8180/realms/staffect",
        client_id: "staffect",
        redirect_uri: "http://genervation.azurewebsites.net/secret",
      };
