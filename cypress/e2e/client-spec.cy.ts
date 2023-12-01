describe("main page", () => {
  beforeEach(() => {
    cy.visit("/userapp/cypress-test-store-1");
  });

  it("filter items", () => {
    cy.get('[data-testid="FilterAltIcon"]').click();

    cy.get(".MuiSelect-select").eq(0).click();
    cy.get("li.MuiMenuItem-root").contains(/pop/i).click();

    cy.contains(/Rock Festival 2024/i).should("not.exist");

    cy.contains(/reset/i).click();

    cy.contains(/Rock Festival 2024/i).should("be.visible");
  });

  it("change sorting key", () => {
    cy.contains(/artist/i)
      .parent()
      .parent()
      .contains(/maryla rodowicz/i);

    cy.contains(/title/i).click();
    cy.get("li")
      .contains(/available amount/i)
      .click();

    cy.contains(/artist/i)
      .parent()
      .parent()
      .contains(/ajronwejder/i);
  });

  it("change sorting order", () => {
    cy.contains(/artist/i)
      .parent()
      .parent()
      .contains(/maryla rodowicz/i);

    cy.get('[data-testid="SwapVertIcon"]').click();

    cy.contains(/artist/i)
      .parent()
      .parent()
      .contains(/ajronwejder/i);
  });
});

describe("details page", () => {
  beforeEach(() => {
    cy.visit("/userapp/cypress-test-store-1/1");
  });

  it("reserve", () => {
    cy.get('[data-testid="AddIcon"]').click();
    cy.get('[data-testid="AddIcon"]').click();

    cy.get("button")
      .contains(/reserve/i)
      .click();

    cy.get('[name="email"]').type("dummy@test.com");
    cy.get('[name="Name"]').type("test");
    cy.get('[name="Phone"]').type("123456789");

    cy.get('button:contains("RESERVE")').click();

    cy.contains(/success/i);
  });
});

describe("reserve", () => {
  beforeEach(() => {
    cy.login("cypress@test.com", "test", "admin");

    cy.visit("/userapp/cypress-test-store-1");
  });

  it("reserve", () => {
    cy.contains(/rock festival 2024/i).click();

    cy.get("button")
      .contains(/reserve/i)
      .click();

    cy.get('[name="email"]').should("be.disabled");
    cy.get('[name="Name"]').type("test");
    cy.get('[name="Phone"]').type("123456789");

    cy.get('button:contains("RESERVE")').click();

    cy.contains(/success/i);
  });

  it("browse user bookings", () => {
    cy.contains(/your bookings/i).click();

    cy.get('[data-testid="ExpandMoreIcon"]').eq(0).click();

    cy.contains(/subitem 1/i);
  });
});

describe("review", () => {
  beforeEach(() => {
    cy.login("cypress@test.com", "test", "admin");

    cy.visit("/userapp/cypress-test-store-2");
  });

  it("review", () => {
    cy.contains(/audi you always wanted/i).click();

    cy.get("button")
      .contains(/add review/i)
      .click();

    cy.get('[name="comment-input"]').type("This is my review");
    cy.get('[name="nick-input"]').type("test");

    cy.get("button").contains(/send/i).click();
  });
});
