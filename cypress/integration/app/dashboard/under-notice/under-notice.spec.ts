describe("Under notice trainees", () => {
  it("should allow me to visit the page", () => {
    cy.visit("/dashboard/under-notice");
  });

  it("should show loading spinner", () => {
    cy.get("mat-spinner");
  });

  it("should show trainees data table with 7 columns", () => {
    cy.get(".mat-table");
    cy.get(".mat-header-row .mat-header-cell").should("have.length", 7);
  });

  it("should show trainees data table with correct column headings", () => {
    cy.get(".mat-header-cell").eq(0).should("have.text", "First name");
    cy.get(".mat-header-cell").eq(1).should("have.text", "Last name");
    cy.get(".mat-header-cell").eq(2).should("have.text", "Gmc no");
    cy.get(".mat-header-cell").eq(3).should("have.text", "Sanction");
    cy.get(".mat-header-cell").eq(4).should("have.text", "Submission date");
    cy.get(".mat-header-cell").eq(5).should("have.text", "Under notice");
    cy.get(".mat-header-cell").eq(6).should("have.text", "Date added");
  });

  it("should show trainees table with some data", () => {
    cy.get(".mat-table .mat-row").eq(0).children().should("have.length", "7");
  });
});
