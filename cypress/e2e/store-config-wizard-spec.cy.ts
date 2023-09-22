describe("store config wizard spec", () => {
  it("creates fixed time, not simultaneous, no periodicity core config", () => {
    cy.visit("http://localhost:5173/store-config-wizard");

    cy.contains("Next").click();

    cy.contains("Flexibility");
    cy.contains("button", "False").click();

    cy.contains("Simultaneous");
    cy.contains("button", "False").click();

    cy.contains("Periodicity");
    cy.contains("button", "No").click();

    cy.contains("You specified core config of your schema!");
  });
});
