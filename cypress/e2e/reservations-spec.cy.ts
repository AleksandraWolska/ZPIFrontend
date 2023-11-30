describe("reservations", () => {
  beforeEach(() => {
    cy.login("cypress@test.com", "test", "admin");

    cy.visit("/admin/cypress-test-store/reservations");
  });

  it("hide passed reservations", () => {
    cy.get(".MuiCollapse-root").should("have.length", 3);

    cy.get(".MuiFormControlLabel-label")
      .contains(/show future reservations only/i)
      .click();

    cy.get(".MuiCollapse-root").should("have.length", 2);
  });

  it("confirm reservation", () => {
    cy.get("button")
      .contains(/confirm/i)
      .click();

    cy.get("button:contains(confirm)").eq(-1).click();
  });
});
