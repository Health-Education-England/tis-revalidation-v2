describe("Trainee list paginator", () => {
  it("should allow me to visit the page", () => {
    cy.visit("/trainees");
  });

  it("should contain trainee list paginator elements", () => {
    cy.get("app-trainee-list-paginator .mat-paginator");
    cy.get("app-trainee-list-paginator .mat-paginator-range-label");
    cy.get("app-trainee-list-paginator .mat-paginator-navigation-previous");
    cy.get("app-trainee-list-paginator .mat-paginator-navigation-next");
  });

  it("should show previous page button as disabled", () => {
    cy.get(
      "app-trainee-list-paginator .mat-paginator-navigation-previous"
    ).should("be.disabled");
  });

  it("should show next page button as enabled", () => {
    cy.get("app-trainee-list-paginator .mat-paginator-navigation-next").should(
      "be.enabled"
    );
  });

  it("should show loading spinner when next page button is clicked", () => {
    cy.get("app-trainee-list-paginator .mat-paginator-navigation-next").click();
    cy.get("mat-spinner");
  });

  it("should update pageIndex parameter in url when previous page button is clicked", () => {
    cy.get(
      "app-trainee-list-paginator .mat-paginator-navigation-previous"
    ).click();

    cy.location().should((loc) => expect(loc.search).to.contain("pageIndex=0"));
  });
});
