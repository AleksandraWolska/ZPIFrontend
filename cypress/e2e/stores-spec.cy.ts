import { goNext } from "./utils";

describe("create new store", () => {
  beforeEach(() => {
    cy.login("cypress@test.com", "test", "admin");
  });

  it("creates non-cyclic, one person per event store", () => {
    cy.visit("/admin");

    cy.contains(/create new store for your business/i).click();

    cy.get('[name="name"]').type("cyp3");

    goNext();

    cy.get("button").contains(/fixed/i).click();
    cy.get("button")
      .contains(/shared/i)
      .click();
    cy.get("button").contains(/no/i).click();
    cy.get("button")
      .contains(/noncyclic/i)
      .click();

    newAttribute().type("Artist");
    checkRequired();
    checkVisibleOnMainPage();
    checkVisibleOnDetailsPage();

    newAttribute().type("Genre");
    checkRequired();
    checkFilterable();
    checkVisibleOnMainPage();
    checkVisibleOnDetailsPage();
    checkPredefinedValues();
    predefineValues(["Jazz", "Rock", "Pop"]);

    newAttribute().type("Price");
    setType("number");
    checkVisibleOnMainPage();
    checkVisibleOnDetailsPage();

    newAttribute().type("Adults only");
    setType("boolean");
    checkFilterable();
    checkVisibleOnMainPage();
    checkVisibleOnDetailsPage();

    goNext();

    cy.get('[name="welcomeTextLine1"]').type("Best Concerts!");
    cy.get('[name="welcomeTextLine2"]').type("Buy tickets now!");

    checkEnableFilters();
    checkDisplayItemTitleInMainPage();
    checkDisplayItemSubtitleInMainPage();
    checkDisplayItemImageInMainPage();

    goNext();

    checkDisplayItemTitleInDetailsPage();
    checkDisplayItemSubtitleInDetailsPage();
    checkDisplayDescriptionForItemsInDetailsPage();

    cy.get('[name="reservationSummaryPrompt"]').type(
      "You have reserved your ticket.",
    );
    cy.get('[name="reservationConfirmationPrompt"]').type(
      "Are you sure that you want to reserve this seat?",
    );
    cy.get('[name="reservationFailurePrompt"]').type(
      "Something went wrong while reserving your seat.",
    );

    goNext();

    ["Name", "Surname", "Phone"].forEach((value) => {
      cy.get(".MuiAutocomplete-input:last").type(value).type("{enter}");
    });

    goNext();

    cy.get("button")
      .contains(/submit/i)
      .click();
  });

  it("creates one person per unique object store", () => {
    cy.visit("/admin");

    cy.contains(/create new store for your business/i).click();

    cy.get('[name="name"]').type("cyp8");

    goNext();

    cy.get("button")
      .contains(/flexible/i)
      .click();
    cy.get("button")
      .contains(/continuous/i)
      .click();
    cy.get("button").contains(/true/i).click();
    cy.get("button")
      .contains(/exclusive/i)
      .click();
    cy.get("button").contains(/yes/i).click();

    newAttribute().type("Brand");
    checkRequired();
    checkFilterable();
    checkVisibleOnMainPage();
    checkVisibleOnDetailsPage();
    checkPredefinedValues();
    predefineValues(["Mercedes", "Audi", "BMW"]);

    newAttribute().type("Year");
    setType("number");
    checkVisibleOnMainPage();
    checkVisibleOnDetailsPage();

    newAttribute().type("Electric");
    setType("boolean");
    checkRequired();
    checkFilterable();
    checkVisibleOnMainPage();
    checkVisibleOnDetailsPage();

    goNext();

    cy.get('[name="welcomeTextLine1"]').type("Welcome to AutoMax!");
    cy.get('[name="welcomeTextLine2"]').type("Rent your dream car now!");

    cy.get('input[type="checkbox"]').check();

    goNext();

    cy.get('input[type="checkbox"]').check();

    cy.get('[name="reservationSummaryPrompt"]').type(
      "You have reserved your car.",
    );
    cy.get('[name="reservationConfirmationPrompt"]').type(
      "Are you sure that you want to reserve this car?",
    );
    cy.get('[name="reservationFailurePrompt"]').type(
      "Something went wrong while reserving your car.",
    );

    goNext();

    ["Name", "Driver's license since"].forEach((value) => {
      cy.get(".MuiAutocomplete-input:last").type(value).type("{enter}");
    });

    cy.get('input[type="radio"][value="yes"]').check();

    goNext();

    cy.get("button")
      .contains(/submit/i)
      .click();
  });
});

describe("edit store", () => {
  beforeEach(() => {
    cy.login("cypress@test.com", "test", "admin");
  });

  it("set email and change custom attribute spec", () => {
    cy.visit("/admin");

    cy.contains(/cypress test store/i).click();

    cy.contains(/store settings/i).click();

    cy.get('[name="email"]').type("cypress@test.com");

    goNext();

    cy.get('.MuiFormControlLabel-label:contains("Required")').eq(1).click();

    goNext();
    goNext();
    goNext();
    goNext();

    cy.get("button")
      .contains(/submit/i)
      .click();
  });
});

function newAttribute() {
  return cy.get('input[type="text"]:not(:disabled):last');
}

function checkRequired() {
  cy.get('.MuiFormControlLabel-label:contains("Required")').eq(-2).click();
}

function checkFilterable() {
  cy.get('.MuiFormControlLabel-label:contains("Filterable")').eq(-2).click();
}

function checkVisibleOnMainPage() {
  cy.get('.MuiFormControlLabel-label:contains("Visible on main page")')
    .eq(-2)
    .click();
}

function checkVisibleOnDetailsPage() {
  cy.get('.MuiFormControlLabel-label:contains("Visible on details page")')
    .eq(-2)
    .click();
}

function checkPredefinedValues() {
  cy.get('.MuiFormControlLabel-label:contains("Predefine values")')
    .eq(-2)
    .click();
}

function predefineValues(values: string[]) {
  values.forEach((value) => {
    cy.get(".MuiAutocomplete-input:not(:disabled):last")
      .type(value)
      .type("{enter}");
  });
}

function setType(type: "string" | "number" | "boolean") {
  cy.get(".MuiSelect-select").eq(-2).click();
  cy.get("li").contains(type).click();
}

function checkEnableFilters() {
  cy.get(".MuiFormControlLabel-label")
    .contains(/enable filters/i)
    .click();
}

function checkDisplayItemTitleInMainPage() {
  cy.get(".MuiFormControlLabel-label")
    .contains(/display title for item in items list/i)
    .click();
}

function checkDisplayItemSubtitleInMainPage() {
  cy.get(".MuiFormControlLabel-label")
    .contains(/display subtitle for item in items list/i)
    .click();
}

function checkDisplayItemImageInMainPage() {
  cy.get(".MuiFormControlLabel-label")
    .contains(/display item images in items list/i)
    .click();
}

function checkDisplayItemTitleInDetailsPage() {
  cy.get(".MuiFormControlLabel-label")
    .contains(/display item's title/i)
    .click();
}

function checkDisplayItemSubtitleInDetailsPage() {
  cy.get(".MuiFormControlLabel-label")
    .contains(/display item's subtitle/i)
    .click();
}

function checkDisplayDescriptionForItemsInDetailsPage() {
  cy.get(".MuiFormControlLabel-label")
    .contains(/display description for items/i)
    .click();
}
