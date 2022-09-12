describe("Recommendations", () => {
  describe("Filter summary records list table", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/recommendations");
    });

    it("should open filter panel when button is clicked", () => {
      const toggleFiltersButton = cy.get(
        "[data-cy='toggleTableFiltersButton']"
      );
      toggleFiltersButton.click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should(
        "be.visible"
      );
    });
  });
});
