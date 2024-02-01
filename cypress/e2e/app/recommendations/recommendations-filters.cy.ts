describe("Recommendations filters", () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/recommendations");
  });

  const filterButtonLabels = ["ALL DOCTORS", "UNDER NOTICE"];

  it("should contain correct filter button labels", () => {
    filterButtonLabels.forEach((btnLabel) => {
      cy.get("app-record-list-filters a").contains(btnLabel).should("exist");
    });
  });

  it("should show 'Under notice' button as active by default", () => {
    cy.get("[data-cy='filter-records-button_UNDERNOTICE']").should(
      "have.class",
      "mdc-tab--active"
    );
  });

  it("should set 'All Doctors' filter button as active when clicked", () => {
    cy.get("[data-cy=filter-records-button_ALLDOCTORS]")
      .click()
      .should("have.class", "mdc-tab--active");
  });
});
