/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(
      email: string,
      password: string,
      type: "admin" | "user",
    ): Cypress.Chainable<void>;

    getInputByLabel(labelText: string): Chainable<JQuery<HTMLElement>>;
  }
}
