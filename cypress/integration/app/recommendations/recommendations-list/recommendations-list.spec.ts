describe("Recommendations list", () => {
  before(() => {
    cy.login();
  });

  it("should allow me to visit the page", () => {
    cy.visit("/recommendations");
  });

  it("should show loading spinner on page load", () => {
    cy.get("mat-spinner");
  });

  it("should show recommendations data table with 10 columns", () => {
    cy.get(".mat-table");
    cy.get(".mat-header-row .mat-header-cell").should("have.length", 10);
  });

  it("should show recommendations data table with correct column headings", () => {
    cy.get(".mat-header-cell").eq(0).should("contain.text", "First name");
    cy.get(".mat-header-cell").eq(1).should("contain.text", "Last name");
    cy.get(".mat-header-cell").eq(2).should("contain.text", "GMC No");
    cy.get(".mat-header-cell")
      .eq(3)
      .should("contain.text", "GMC Submission due date");
    cy.get(".mat-header-cell").eq(4).should("contain.text", "Status");
    cy.get(".mat-header-cell").eq(5).should("contain.text", "Programme name");
    cy.get(".mat-header-cell")
      .eq(6)
      .should("contain.text", "Programme membership type");
    cy.get(".mat-header-cell").eq(7).should("contain.text", "CCT date");
    cy.get(".mat-header-cell").eq(8).should("contain.text", "Admin");
    cy.get(".mat-header-cell").eq(9).should("contain.text", "Last updated");
  });

  it("should show recommendations table with some data", () => {
    cy.get(".mat-table .mat-row").eq(0).children().should("have.length", "10");
  });

  it("should list recommendations by `GMC Submission due date` when page loads", () => {
    cy.get(".mat-header-cell")
      .eq(3)
      .should("have.attr", "aria-sort")
      .and("eq", "descending");
  });

  it("should list recommendations by `First name` when sorted by this column", () => {
    cy.get(".mat-header-cell").eq(0).click();
    cy.get(".mat-header-cell")
      .eq(0)
      .should("have.attr", "aria-sort")
      .and("eq", "ascending");
  });
});
