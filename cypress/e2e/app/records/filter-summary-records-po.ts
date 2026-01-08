export class FilterRecords {
  static toggleFilterPanel = () => {
    cy.get("[data-cy='toggleTableFiltersButton']").click();
    cy.get(".filters-drawer-container .mat-drawer-opened").should("not.exist");
    cy.get("[data-cy='toggleTableFiltersButton']").click();
    cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
  };

  static openDropdown = (element: string, query: string) => {
    cy.get(".mat-mdc-autocomplete-panel mat-option").should("not.exist");
    cy.get(`${element} input`).type(query, {
      force: true
    });
    cy.get(
      ".mat-mdc-autocomplete-panel [data-cy='autocomplete-option']"
    ).should("exist");
    cy.get("mat-option").eq(1).click();
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
    cy.wait(1000);
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
    cy.get("app-record-list .mat-mdc-table").should("exist");
    cy.wait(1000);
  };

  static resetForm = () => {
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

  static readonly selectDateRange = (element: string) => {
    cy.get(`${element} mat-datepicker-toggle button`).click();
    cy.wait(500);
    cy.get("mat-calendar button.mat-calendar-body-cell").first().click();
    cy.wait(500);
    cy.get("mat-calendar button.mat-calendar-body-cell").last().click();
    cy.wait(500);
    cy.get(`${element} mat-date-range-input input.mat-start-date`)
      .invoke("val")
      .should("not.be.empty");
    cy.get(`${element} mat-date-range-input input.mat-end-date`)
      .invoke("val")
      .should("not.be.empty");
  };

  static readonly populateDateRange = (element: string) => {
    cy.get(`${element} mat-date-range-input input.mat-start-date`).type(
      "01/01/2026"
    );
    cy.wait(500);
    cy.get(`${element} mat-date-range-input input.mat-end-date`).type(
      "10/01/2026"
    );
    cy.get(`${element} mat-date-range-input input.mat-end-date`).blur();
    cy.wait(500);
  };
}
