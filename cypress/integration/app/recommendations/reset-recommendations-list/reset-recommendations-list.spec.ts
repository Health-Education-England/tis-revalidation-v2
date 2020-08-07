describe("Reset recommendations list", () => {
  before(() => {
    cy.login();
  });

  it("should allow me to visit the page", () => {
    cy.visit("/recommendations");
  });

  it("should contain reset recommendations list element", () => {
    cy.get("app-record-search .mat-menu-trigger").click();
    cy.get("app-reset-record-list button").should("contain.text", "Clear all");
  });

  it("should reset recommendations list when `Clear all` is clicked", () => {
    // cy.get("app-record-search .mat-menu-trigger").click();
    cy.get("app-reset-record-list button").click();
    cy.get(".mat-header-cell")
      .eq(3)
      .should("have.attr", "aria-sort")
      .and("eq", "descending");
  });
});
