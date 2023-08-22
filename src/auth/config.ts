export const oidcConfig = {
  authority: "http://localhost:4000/realms/myrealm",
  client_id: "myclient",
  redirect_uri: "http://localhost:5173/secret",
  scope: "openid",
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
