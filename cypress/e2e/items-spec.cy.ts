import { goNext } from "./utils";

describe("new item", () => {
  beforeEach(() => {
    cy.login("cypress@test.com", "test", "admin");
  });

  it("add a new item", () => {
    cy.visit("/admin");

    cy.contains(/cypress test store 2/i).click();

    cy.contains(/new item/i).click();

    cy.get('[name="title"]').type("BWM with the best acceleration");

    goNext();

    cy.get(".MuiSelect-select").eq(-1).click();
    cy.get("li").contains(/bmw/i).click();

    cy.get('input[type="number"]').type("2023");

    cy.get(".MuiFormControlLabel-label")
      .contains(/electric/i)
      .click();

    goNext();
    cy.get("button:contains(Next)").eq(-1).click();

    cy.get("button")
      .contains(/add item/i)
      .click();

    cy.contains("BWM with the best acceleration");
  });
});

describe("items", () => {
  beforeEach(() => {
    cy.login("cypress@test.com", "test", "admin");

    cy.visit("/admin/cypress-test-store-2/item-list");
  });

  it("edit item", () => {
    cy.contains(/edit/i).click();

    cy.get('[name="title"]').clear().type("Mercedes you always dreamed of");

    cy.get("button")
      .contains(/save edited item/i)
      .click();

    cy.contains("Mercedes you always dreamed of");
  });

  it("deactivate item", () => {
    cy.contains(/deactivate/i).click();

    cy.get("button:contains(Deactivate)").eq(-1).click();

    cy.get(".MuiChip-label").first().should("include.text", "inactive");
  });

  it("delete item", () => {
    cy.contains(/delete/i).click();

    cy.get("button:contains(Delete)").eq(-1).click();

    cy.contains("Audi you always wanted").should("not.exist");
  });
});
