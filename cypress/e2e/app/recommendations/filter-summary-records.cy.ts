describe("Recommendations", () => {
  describe("Apply filtering to summary records list table", () => {
    beforeEach(() => {
      cy.loginSession();
    });
    const initFilterPanel = () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
      cy.wait(3000);
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
      cy.wait(2000);
    };

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

    describe("Filter by DBC", () => {
      it("should display 'dbc' selection list filters", () => {
        initFilterPanel();
        cy.get("[data-cy='selectionListdbcs']").should("exist");
      });

      it("should display 4 selection options in the 'dbc' selection list labelled accordingly", () => {
        const dbcLabels = [
          "Kent, Surrey and Sussex",
          "North Central and East London",
          "North West London",
          "South London"
        ];

        initFilterPanel();

        cy.get(
          "[data-cy='selectionListdbcs'] .mat-list-option .mat-list-text"
        ).should("have.length", 4);
        cy.get(
          "[data-cy='selectionListdbcs'] .mat-list-option .mat-list-text"
        ).each(($el, index) => {
          expect(dbcLabels.indexOf($el.text().trim())).to.be.greaterThan(-1);
        });
      });

      it("should filter summary records list by single dbc when single option selected and submitted", () => {
        initFilterPanel();

        cy.get("[data-cy='selectionOption1-AIIDR8']").should("exist");
        cy.get("[data-cy='selectionOption1-AIIDR8']").click();
        checkButtonsDisabled("not.be.disabled");

        submitForm();

        cy.get("td.cdk-column-designatedBody").each(($el, index, $list) => {
          expect($el.text()).to.equal("1-AIIDR8");
        });
      });

      it("should filter summary records list by multiple dbcs when multiple options selected and submitted", () => {
        initFilterPanel();
        const selectedDbcs = ["1-AIIDR8", "1-AIIDVS"];
        selectedDbcs.forEach((dbc) => {
          const $el = cy.get("[data-cy='selectionOption" + dbc + "']");
          $el.should("exist");
          $el.click();
        });

        checkButtonsDisabled("not.be.disabled");

        submitForm();

        const dbcs: string[] = [];
        cy.get("td.cdk-column-designatedBody")
          .each(($el, index, $list) => {
            dbcs.push($el.text());
          })
          .then(() => {
            expect(
              dbcs.every((dbc) => {
                return dbc === selectedDbcs[0] || dbc === selectedDbcs[1];
              })
            ).to.be.true;
          });
      });

      it("should filter by both 'programme name' and 'dbc' when both filters selected", () => {
        initFilterPanel();

        cy.get("[data-cy='formfield_programmeName'] input").type("neuro");
        cy.wait(2000);
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            cy.wait(2000);
            cy.get("[data-cy='selectionOption1-AIIDR8']").click();

            submitForm();
            cy.get("td.cdk-column-programmeName").each(($el, index, $list) => {
              expect($el.text()).to.equal(value);
            });
            cy.get("td.cdk-column-designatedBody").each(($el, index, $list) => {
              expect($el.text()).to.equal("1-AIIDR8");
            });
          });
      });

      it("should display all London/KSS dbcs when no filter selected and submitted", () => {
        initFilterPanel();
        cy.get("[data-cy='selectionOption1-AIIDR8']").should("exist");
        cy.get("[data-cy='selectionOption1-AIIDR8']").click();

        cy.get(".mat-paginator-range-label")
          .invoke("text")
          .then((paginatorText) => {
            submitForm();
            cy.get(".mat-paginator-range-label").should(
              "not.contain",
              paginatorText
            );
            cy.get("[data-cy='selectionOption1-AIIDR8']").click();
            submitForm();
            cy.get(".mat-paginator-range-label").should(
              "contain",
              paginatorText
            );
          });
      });

      it("should not display trainees assigned to other dbcs when query string params updated in url", () => {
        cy.visit(
          "/recommendations?active=submissionDate&direction=asc&pageIndex=0&filter=underNotice&programmeName=&dbcs=1-AIIDWT"
        );
        cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
        cy.wait(2000);
        cy.get("td.cdk-column-designatedBody").each(($el, index, $list) => {
          expect($el.text() === "1-AIIDWT").to.be.false;
        });
      });
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

        cy.get("mat-option").should("not.exist");
        cy.get("[data-cy='formfield_programmeName'] input").type("Clin");
        cy.wait(2000);
        cy.get("mat-option").should("have.length.above", 1);
      });

      it("should display list where first item matches input text", () => {
        initFilterPanel();
        const query = "Clinical";
        cy.get("mat-option").should("not.exist");
        cy.get("[data-cy='formfield_programmeName'] input").type(query);
        cy.wait(2000);
        cy.get("mat-option").first().should("contain", query);
      });

      it("should set value of textbox matching selected item from list", () => {
        initFilterPanel();

        cy.get("mat-option").should("not.exist");
        cy.get("[data-cy='formfield_programmeName'] input").type("clin");
        cy.wait(2000);
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            cy.wait(2000);
            cy.get("[data-cy='formfield_programmeName'] input").should(
              "have.value",
              value
            );
          });
      });

      it("should enable both buttons when item selected from list", () => {
        initFilterPanel();

        cy.get("mat-option").should("not.exist");
        cy.get("[data-cy='formfield_programmeName'] input").type("clin");
        cy.wait(2000);
        cy.get("mat-option").eq(1).click();
        cy.wait(2000);
        checkButtonsDisabled("not.be.disabled");
      });

      it("should update summary table displaying trainees with matching programme name only", () => {
        initFilterPanel();

        cy.get("mat-option").should("not.exist");
        cy.get("[data-cy='formfield_programmeName'] input").type("clin");
        cy.wait(2000);
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            cy.wait(2000);
            submitForm();

            cy.get("td.cdk-column-programmeName").each(($el, index, $list) => {
              expect($el.text()).to.equal(value);
            });
          });
      });

      it("should reset summary table results when 'Clear fliters' button is clicked", () => {
        initFilterPanel();
        cy.get("[data-cy='formfield_programmeName'] input").type("clin");
        cy.wait(2000);
        cy.get("mat-option").eq(1).click();
        cy.wait(2000);
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
            cy.wait(2000);
            cy.get(".mat-paginator-range-label").should(
              "contain",
              paginatorText
            );
          });
      });
    });
  });
});
