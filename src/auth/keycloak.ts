import Keycloak from "keycloak-js";

const config =
  process.env.NODE_ENV === "development"
    ? {
        url: "http://localhost:4000",
        realm: "myrealm",
        clientId: "myclient",
      }
    : {
        authority: "http://130.61.252.200:8180",
        realm: "staffect",
        clientId: "staffect",
      };

export const keycloak = new Keycloak(config);

await keycloak.init({});
