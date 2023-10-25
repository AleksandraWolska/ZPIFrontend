import { User } from "oidc-client-ts";

const {
  authority,
  client_id: clientId,
  redirect_uri: redirectUri,
} = process.env.NODE_ENV === "development"
  ? {
      authority: "http://localhost:4000/realms/myrealm",
      client_id: "myclient",
      redirect_uri: "http://localhost:5173/secret",
    }
  : {
      authority: "http://130.61.252.200:8180/realms/zpi",
      client_id: "zpi_client",
      redirect_uri: "http://genervation.azurewebsites.net/secret",
    };

export const oidcConfig = {
  authority,
  client_id: clientId,
  redirect_uri: redirectUri,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

export function getUser() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${authority}:${clientId}`,
  );

  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}

export function getAccessToken() {
  const user = getUser();

  if (!user) {
    return null;
  }

  return user.access_token;
}
