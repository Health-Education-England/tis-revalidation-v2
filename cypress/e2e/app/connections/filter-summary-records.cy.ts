describe("Connections", () => {
  describe("Apply filtering to summary records list table", () => {
    beforeEach(() => {
      cy.loginSession();
    });

    const openProgrammeNameDropdown = (query: string = "General Surgery") => {
      cy.get(".mat-autocomplete-panel mat-option").should("not.exist");
      cy.get("[data-cy='formfield_programmeName'] input").type(query);
      cy.get(".mat-autocomplete-panel [data-cy='autocomplete-option']").should(
        "exist"
      );
    };

    const showDiscrepancies = () => {
      cy.get("[data-cy='filter-records-button_DISCREPANCIES']").click();
      cy.get("app-record-list .mat-table").should("exist");
    };
    const initFilterPanel = () => {
      cy.visit("/connections");
      cy.get("app-record-list .mat-table").should("exist");
      showDiscrepancies();
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get("app-form-controller").should("exist");
    };

    const checkButtonsDisabled = (status: string = "be disabled") => {
      cy.get(
        "[data-cy='tableFiltersForm'] [data-jasmine='clearFiltersButton']"
      ).should(status);
      cy.get(
        "[data-cy='tableFiltersForm'] [data-jasmine='submitFormButton']"
      ).should(status);
    };

    const submitForm = () => {
      cy.get(
        "[data-cy='tableFiltersForm'] button[data-jasmine='submitFormButton']"
      ).click();
      cy.get("app-record-list .mat-table").should("exist");
    };

    it("should open and close filter panel when toggle button is clicked", () => {
      cy.visit("/connections");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should(
        "not.exist"
      );
    });

    describe("Filter by Programme Name", () => {
      it("should display 'programme name' filter field", () => {
        initFilterPanel();
        cy.get("[data-cy='formfield_programmeName']").should("exist");
      });

      it("should display 'Apply filters' and 'Clear filters' buttons disabled by default", () => {
        initFilterPanel();
        cy.get("[data-cy='tableFiltersForm'] button").should("have.length", 2);
        cy.get(
          "[data-cy='tableFiltersForm'] button[data-jasmine='clearFiltersButton']"
        ).should(($el) => expect($el.text().trim()).to.equal("Clear filters"));
        cy.get(
          "[data-cy='tableFiltersForm'] button[data-jasmine='clearFiltersButton']"
        ).should("be.disabled");

        cy.get(
          "[data-cy='tableFiltersForm'] button[data-jasmine='submitFormButton']"
        ).should(($el) => expect($el.text().trim()).to.equal("Apply filters"));
        cy.get(
          "[data-cy='tableFiltersForm'] button[data-jasmine='submitFormButton']"
        ).should("be.disabled");
      });

      it("should display list containing matching options when the text 'clin' is entered in 'programme name' field", () => {
        initFilterPanel();
        openProgrammeNameDropdown();
        cy.get("mat-option").should("have.length.above", 1);
      });

      it("should display list where first item matches input text", () => {
        initFilterPanel();
        const query = "Clinical";
        openProgrammeNameDropdown(query);
        cy.get("mat-option").first().should("contain", query);
      });

      it("should set value of textbox matching selected item from list", () => {
        initFilterPanel();

        openProgrammeNameDropdown();
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            cy.get("[data-cy='formfield_programmeName'] input").should(
              "have.value",
              value
            );
          });
      });

      it("should enable both buttons when item selected from list", () => {
        initFilterPanel();

        openProgrammeNameDropdown();
        cy.get("mat-option").eq(1).click();
        checkButtonsDisabled("not.be.disabled");
      });

      it("should update summary table displaying trainees with matching programme name only", () => {
        initFilterPanel();

        openProgrammeNameDropdown();
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            submitForm();

            cy.get("td.cdk-column-programmeName").each(($el) => {
              expect($el.text().trim()).to.equal(value);
            });
          });
      });

      it("should reset summary table results when 'Clear fliters' button is clicked", () => {
        initFilterPanel();
        openProgrammeNameDropdown();
        cy.get("mat-option").eq(1).click();
        cy.get(".mat-paginator-range-label")
          .invoke("text")
          .then((paginatorText) => {
            submitForm();
            cy.get(".mat-paginator-range-label").should(
              "not.contain",
              paginatorText
            );
            cy.get(
              "[data-cy='tableFiltersForm'] [data-jasmine='clearFiltersButton']"
            ).click();
            cy.get(".mat-paginator-range-label").should(
              "contain",
              paginatorText
            );
          });
      });
    });
  });
});
