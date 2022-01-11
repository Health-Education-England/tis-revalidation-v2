describe("Recommendations search", () => {
  before(() => {
    cy.login();
  });

  const searchForm = "app-record-search form";

  it("should allow me to visit the page", () => {
    cy.visit("/recommendations");
  });
});
