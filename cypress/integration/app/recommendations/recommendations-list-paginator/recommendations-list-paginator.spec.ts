describe("Recommendations list paginator", () => {
  before(() => {
    cy.login();
  });

  it("should allow me to visit the page", () => {
    cy.visit("/recommendations");
  });
});
