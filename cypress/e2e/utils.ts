export function goNext() {
  cy.get("button").contains(/next/i).click();
}
