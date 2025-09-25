export class FilterRecords {
  static toggleFilterPanel = () => {
    cy.get("[data-cy='toggleTableFiltersButton']").click();
    cy.get(".filters-drawer-container .mat-drawer-opened").should("not.exist");
    cy.get("[data-cy='toggleTableFiltersButton']").click();
    cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
  };

  static openProgrammeNameDropdown = (query: string = "General Practice") => {
    cy.get(".mat-mdc-autocomplete-panel mat-option").should("not.exist");
    cy.get("[data-cy='formfield_programmeName'] input").type(query, {
      force: true
    });
    cy.get(
      ".mat-mdc-autocomplete-panel [data-cy='autocomplete-option']"
    ).should("exist");
  };

  static openTisAdminDropdown = (query: string = "St") => {
    cy.get(".mat-mdc-autocomplete-panel mat-option").should("not.exist");
    cy.get("[data-cy='formfield_admin'] input").type(query);
    cy.get(
      ".mat-mdc-autocomplete-panel [data-cy='autocomplete-option']"
    ).should("exist");
  };

  static openFilterTab = (label: string) => {
    cy.get(`[data-cy='filter-records-button_${label}']`).click();
    cy.get("app-record-list .mat-mdc-table").should("exist");
  };

  static readonly initFilterPanel = (
    path: string = "/recommendations",
    isOpen: boolean = true
  ) => {
    cy.visit(path);
    cy.get("app-record-list .mat-mdc-table").should("exist");
    if (!isOpen) {
      cy.get("[data-cy='toggleTableFiltersButton']").click();
    }
    cy.get("app-form-controller").should("exist");
    cy.scrollTo(0, 0);
  };

  static checkButtonsDisabled = (status: string = "be disabled") => {
    cy.get(
      "[data-cy='tableFiltersForm'] [data-jasmine='clearFiltersButton']"
    ).should(status);
    cy.get(
      "[data-cy='tableFiltersForm'] [data-jasmine='submitFormButton']"
    ).should(status);
  };

  static checkSummaryTableIsFiltered = () => {
    cy.get("mat-option")
      .eq(1)
      .invoke("text")
      .then((value) => {
        cy.get("mat-option").eq(1).click();
        FilterRecords.submitForm();

        cy.get("td.cdk-column-programmeName").each(($el) => {
          expect($el.text().trim()).to.equal(value);
        });
      });
  };

  static submitForm = () => {
    cy.get(
      "[data-cy='tableFiltersForm'] button[data-jasmine='submitFormButton']"
    ).click();
    cy.get("app-record-list .mat-mdc-table").should("exist");
    cy.wait(1000);
  };

  static resetForm = () => {
    cy.get("mat-option").eq(1).click();
    cy.get(".mat-mdc-paginator-range-label")
      .invoke("text")
      .then((paginatorText) => {
        FilterRecords.submitForm();
        cy.get(".mat-mdc-paginator-range-label").should(
          "not.contain",
          paginatorText
        );
        cy.get(
          "[data-cy='tableFiltersForm'] [data-jasmine='clearFiltersButton']"
        ).click();
        cy.get(".mat-mdc-paginator-range-label").should(
          "contain",
          paginatorText
        );
      });
  };
}
