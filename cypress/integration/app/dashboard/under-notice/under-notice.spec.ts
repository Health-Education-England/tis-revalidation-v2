describe("Under notice trainees", () => {
  it("should allow me to visit the page", () => {
    cy.visit("/dashboard/under-notice");
  });

  it("should show loading spinner", () => {
    cy.get("mat-spinner");
  });

  it("should show trainees data table with 7 columns", () => {
    cy.get(".nhsuk-table-responsive");
    cy.get(".nhsuk-table__caption")
      .eq(0)
      .should("have.text", "Trainees under notice");
    cy.get(".nhsuk-table__header").should("have.length", 7);
  });

  it("should show trainees data table with correct column headings", () => {
    cy.get(".nhsuk-table__header")
      .eq(0)
      .should("have.text", "First name");
    cy.get(".nhsuk-table__header")
      .eq(1)
      .should("have.text", "Last name");
    cy.get(".nhsuk-table__header")
      .eq(2)
      .should("have.text", "Gmc no");
    cy.get(".nhsuk-table__header")
      .eq(3)
      .should("have.text", "Designated Body");
    cy.get(".nhsuk-table__header")
      .eq(4)
      .should("have.text", "Status");
    cy.get(".nhsuk-table__header")
      .eq(5)
      .should("have.text", "Trainee type");
    cy.get(".nhsuk-table__header")
      .eq(6)
      .should("have.text", "Last updated");
  });

  it("should show trainees table with some data", () => {
    cy.get(".nhsuk-table__body .nhsuk-table__row")
      .eq(0)
      .children()
      .should("have.length", "7");
  });
});
