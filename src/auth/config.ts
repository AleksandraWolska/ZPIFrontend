export const oidcConfig = {
  authority: "http://130.61.252.200:8180/realms/staffect",
  client_id: "staffect",
  redirect_uri: "http://genervation.azurewebsites.net/secret",
  resource: "spring-app",
  // scope: "openid",
  // onSigninCallback: () => {
  //   window.history.replaceState({}, document.title, window.location.pathname);
  // },
};
