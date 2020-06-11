describe("Reset recommendations list", () => {
  it("should allow me to visit the page", () => {
    cy.visit("/recommendations");
  });

  it("should contain reset recommendations list element", () => {
    cy.get("app-reset-recommendations-list .mat-button-wrapper").should(
      "contain.text",
      "Clear all"
    );
  });

  it("should reset recommendations list when `Clear all` is clicked", () => {
    cy.get("app-reset-recommendations-list button").click();
    cy.get("mat-spinner");
    cy.get(".mat-header-cell")
      .eq(3)
      .should("have.attr", "aria-sort")
      .and("eq", "descending");
  });
});
