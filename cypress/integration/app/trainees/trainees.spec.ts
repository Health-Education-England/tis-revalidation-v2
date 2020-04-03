describe("Trainees", () => {
  it("should allow me to visit the page", () => {
    cy.visit("/trainees");
  });

  it("should show loading spinner", () => {
    cy.get("mat-spinner");
  });

  it("should show trainees data table with 10 columns", () => {
    cy.get(".mat-table");
    cy.get(".mat-header-row .mat-header-cell").should("have.length", 10);
  });

  it("should show trainees data table with correct column headings", () => {
    cy.get(".mat-header-cell").eq(0).should("have.text", "First name");
    cy.get(".mat-header-cell").eq(1).should("have.text", "Last name");
    cy.get(".mat-header-cell").eq(2).should("have.text", "Gmc no");
    cy.get(".mat-header-cell")
      .eq(3)
      .should("have.text", "GMC Submission due date");
    cy.get(".mat-header-cell").eq(4).should("have.text", "Status");
    cy.get(".mat-header-cell").eq(5).should("have.text", "Programme name");
    cy.get(".mat-header-cell")
      .eq(6)
      .should("have.text", "Programme membership type");
    cy.get(".mat-header-cell").eq(7).should("have.text", "CCT date");
    cy.get(".mat-header-cell").eq(8).should("have.text", "Admin");
    cy.get(".mat-header-cell").eq(9).should("have.text", "Last updated");
  });

  it("should show trainees table with some data", () => {
    cy.get(".mat-table .mat-row").eq(0).children().should("have.length", "10");
  });
});
