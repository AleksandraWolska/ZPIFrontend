describe("template spec", () => {
  it("opens todo list", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Todos").click();

    cy.contains("All").click();

    cy.url().should("include", "/todos/all");

    cy.contains("Learn TypeScript");
  });
});
