describe("Recommendations list paginator", () => {
  before(() => {
    cy.login();
  });

  it("should allow me to visit the page", () => {
    cy.visit("/recommendations");
  });

  it("should contain recommendations list paginator elements", () => {
    cy.get("app-recommendations-list-paginator .mat-paginator");
    cy.get("app-recommendations-list-paginator .mat-paginator-range-label");
    cy.get(
      "app-recommendations-list-paginator .mat-paginator-navigation-previous"
    );
    cy.get("app-recommendations-list-paginator .mat-paginator-navigation-next");
  });

  it("should show previous page button as disabled", () => {
    cy.get(
      "app-recommendations-list-paginator .mat-paginator-navigation-previous"
    ).should("be.disabled");
  });

  it("should show next page button as enabled", () => {
    cy.get(
      "app-recommendations-list-paginator .mat-paginator-navigation-next"
    ).should("be.enabled");
  });

  it("should update pageIndex parameter in url when previous next button is clicked", () => {
    cy.get(
      "app-recommendations-list-paginator .mat-paginator-navigation-next"
    ).click();

    cy.location().should((loc) => expect(loc.search).to.contain("pageIndex=1"));
  });
});
