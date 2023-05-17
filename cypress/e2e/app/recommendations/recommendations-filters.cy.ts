describe("Recommendations filters", () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/recommendations");
  });

  const filterButtonLabels = ["ALL DOCTORS", "UNDER NOTICE"];

  it("should contain correct filter button labels", () => {
    cy.get("app-record-list-filters a").each(($el) => {
      expect($el.text().trim()).to.be.oneOf(filterButtonLabels);
    });
  });

  it("should show 'Under notice' button as active by default", () => {
    cy.get("[data-cy='filter-records-button_UNDERNOTICE']").should(
      "have.class",
      "mat-tab-label-active"
    );
  });

  it("should set 'All Doctors' filter button as active when clicked", () => {
    cy.get("[data-cy=filter-records-button_ALLDOCTORS]")
      .click()
      .should("have.class", "mat-tab-label-active");
  });
});
