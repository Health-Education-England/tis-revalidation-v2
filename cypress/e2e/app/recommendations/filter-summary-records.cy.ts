describe("Recommendations", () => {
  describe("Apply filtering to summary records list table", () => {
    beforeEach(() => {
      cy.loginSession();
    });

    it("should open and close filter panel when toggle button is clicked", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
      cy.wait(3000);
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should(
        "not.exist"
      );
    });

    it("should display 'programme name' filter field", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
      cy.get("[data-cy='formfield_programmeName']").should("exist");
    });

    it("should display 'Apply filters' and 'Clear filters' buttons disabled by default", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
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

    it("should display list containing matching options when the text 'clin' is entered", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");

      cy.get("mat-option").should("not.exist");
      cy.get("[data-cy='formfield_programmeName'] input").type("Clin");
      cy.wait(1000);
      cy.get("mat-option").should("have.length.above", 1);
    });

    it("should display error message when no matching options found", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");

      cy.get("mat-option").should("not.exist");
      cy.get("[data-cy='formfield_programmeName'] input").type("qwert");
      cy.wait(1000);

      cy.get("[data-cy='formFieldWrapper'] div.mat-error").should(
        "contain",
        "No matches found"
      );
    });

    it("should set value of textbox matching selected item from list", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");

      cy.get("mat-option").should("not.exist");
      cy.get("[data-cy='formfield_programmeName'] input").type("clin");
      cy.wait(1000);
      cy.get("mat-option")
        .first()
        .invoke("text")
        .then((value) => {
          cy.get("mat-option").first().click();
          cy.wait(1000);
          cy.get("[data-cy='formfield_programmeName'] input").should(
            "have.value",
            value
          );
        });
    });

    it("should enable both buttons when item selected from list", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");

      cy.get("mat-option").should("not.exist");
      cy.get("[data-cy='formfield_programmeName'] input").type("clin");
      cy.wait(1000);
      cy.get("mat-option").first().click();
      cy.wait(1000);
      cy.get(
        "[data-cy='tableFiltersForm'] [data-jasmine='clearFiltersButton']"
      ).should("not.be.disabled");
      cy.get(
        "[data-cy='tableFiltersForm'] [data-jasmine='submitFormButton']"
      ).should("not.be.disabled");
    });

    it("should update summary table displaying trainees with matching programme name only", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");

      cy.get("mat-option").should("not.exist");
      cy.get("[data-cy='formfield_programmeName'] input").type("clin");
      cy.wait(1000);
      cy.get("mat-option")
        .first()
        .invoke("text")
        .then((value) => {
          cy.get("mat-option").first().click();
          cy.wait(1000);
          cy.get(
            "[data-cy='tableFiltersForm'] button[data-jasmine='submitFormButton']"
          ).click();
          cy.wait(1000);

          cy.get("td.cdk-column-programmeName").each(($el, index, $list) => {
            expect($el.text()).to.equal(value);
          });
        });
    });

    it("should reset summary table results when 'Clear fliters' button is clicked", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.wait(1000);
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
      cy.get("[data-cy='formfield_programmeName'] input").type("clin");
      cy.wait(1000);
      cy.get("mat-option").first().click();
      cy.wait(1000);
      cy.get(".mat-paginator-range-label")
        .invoke("text")
        .then((paginatorText) => {
          cy.get(
            "[data-cy='tableFiltersForm'] button[data-jasmine='submitFormButton']"
          ).click();
          cy.wait(1000);
          cy.get(".mat-paginator-range-label").should(
            "not.contain",
            paginatorText
          );
          cy.get(
            "[data-cy='tableFiltersForm'] [data-jasmine='clearFiltersButton']"
          ).click();
          cy.wait(1000);
          cy.get(".mat-paginator-range-label").should("contain", paginatorText);
        });
    });
  });
});
