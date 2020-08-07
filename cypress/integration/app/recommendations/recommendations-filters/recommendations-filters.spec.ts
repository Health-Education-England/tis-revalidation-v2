describe("Recommendations filters", () => {
  before(() => {
    cy.login();
  });

  const buttons = "app-recommendations-filters a";

  it("should allow me to visit the page", () => {
    cy.visit("/recommendations");
  });

  it("should contain under notice and all doctors buttons", () => {
    cy.get(buttons).should("have.length", 2);
    cy.get(buttons).eq(0).should("contain.text", "ALL DOCTORS");
    cy.get(buttons).eq(1).should("contain.text", "UNDER NOTICE");
  });

  it("under notice button should be active by default", () => {
    cy.get(buttons).eq(1).should("have.class", "mat-tab-label-active");
  });

  it("clicking on all doctors button should set it as active", () => {
    cy.get(buttons).eq(0).click().should("have.class", "mat-tab-label-active");
  });

  it("clicking on all doctors button should update the query parameter in url", () => {
    cy.location().should((loc) =>
      expect(loc.search).to.contain("filter=allDoctors")
    );
  });
});
