describe("Reset trainee list", () => {
  it("should allow me to visit the page", () => {
    cy.visit("/trainees");
  });

  it("should contain reset trainee list element", () => {
    cy.get("app-reset-trainee-list span").should("have.text", "Clear all");
  });

  it("should reset trainee list when `Clear all` is clicked", () => {
    cy.get("app-reset-trainee-list span").click();
    cy.get("mat-spinner");
    cy.get(".mat-header-cell")
      .eq(3)
      .should("have.attr", "aria-sort")
      .and("eq", "descending");
  });
});
