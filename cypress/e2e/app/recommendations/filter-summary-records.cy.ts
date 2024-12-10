import { FilterRecords } from "../records/filter-summary-records-po";
describe("Recommendations", () => {
  describe("Apply filtering to summary records list table", () => {
    beforeEach(() => {
      cy.loginSession();
    });

    const formFilters = {
      dbc: [
        {
          value: "1-1RUZV1D",
          label: "Kent, Surrey and Sussex",
          abbr: "KSS"
        },
        {
          value: "1-1RUZV4H",
          label: "North Central and East London",
          abbr: "NCEL"
        },
        { value: "1-1RUZV6H", label: "North West London", abbr: "WL" },
        { value: "1-1RSSQ5L", label: "South London", abbr: "SL" }
      ],

      gmcStatus: ["Approved", "Rejected", "Under Review"],
      tisStatus: [
        { value: "NOT_STARTED", label: "Not started" },
        { value: "SUBMITTED_TO_GMC", label: "Submitted to GMC" },
        { value: "DRAFT", label: "Draft" },
        { value: "COMPLETE", label: "Complete" }
      ]
    };

    it("should open and close filter panel when toggle button is clicked", () => {
      cy.visit("/recommendations");
      FilterRecords.toggleFilterPanel();
    });

    describe("Filter by DBC", () => {
      it("should display 'dbc' selection list filters", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy='selectionListdbcs']").should("exist");
      });

      it("should display 4 selection options in the 'dbc' selection list labelled accordingly", () => {
        FilterRecords.initFilterPanel();

        cy.get("[data-cy='selectionListdbcs'] .mat-mdc-list-item").should(
          "have.length",
          4
        );
        cy.get("[data-cy='selectionListdbcs'] .mat-mdc-list-item").each(
          ($el) => {
            expect($el.text().trim()).to.be.oneOf(
              formFilters.dbc.map((item) => item.label)
            );
          }
        );
      });

      it("should filter summary records list by single dbc when single option selected and submitted", () => {
        FilterRecords.initFilterPanel();

        cy.get("[data-cy='selectionOption1-1RUZV1D']").should("exist");
        cy.get("[data-cy='selectionOption1-1RUZV1D']").click();
        FilterRecords.submitForm();
        cy.get("td.cdk-column-designatedBody").each(($el) => {
          expect($el.text().trim()).to.equal("KSS");
        });
      });

      it("should filter summary records list by multiple dbcs when multiple options selected and submitted", () => {
        FilterRecords.initFilterPanel();
        const selectedDbcs = formFilters.dbc.filter((_, index) => index < 2);

        selectedDbcs.forEach((dbc) => {
          const $el = cy.get("[data-cy='selectionOption" + dbc.value + "']");
          $el.should("exist");
          $el.click();
        });

        FilterRecords.checkButtonsDisabled("not.be.disabled");

        FilterRecords.submitForm();

        cy.get("td.cdk-column-designatedBody").each(($el) => {
          expect($el.text().trim()).to.be.oneOf(
            selectedDbcs.map((dbc) => dbc.abbr)
          );
        });
      });

      it("should filter by both 'programme name' and 'dbc' when both filters selected", () => {
        FilterRecords.initFilterPanel();

        FilterRecords.openProgrammeNameDropdown("Neurology KSS");
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            cy.get("[data-cy='selectionOption1-1RUZV1D']").click();

            FilterRecords.submitForm();
            cy.get("td.cdk-column-programmeName").each(($el) => {
              expect($el.text().trim()).to.equal(value);
            });
            cy.get("td.cdk-column-designatedBody").each(($el) => {
              expect($el.text().trim()).to.equal("KSS");
            });
          });
      });

      it("should display all London/KSS dbcs when no filter selected and submitted", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy='selectionOption1-1RUZV1D']").should("exist");
        cy.get("[data-cy='selectionOption1-1RUZV1D']").click();

        cy.get(".mat-mdc-paginator-range-label")
          .invoke("text")
          .then((paginatorText) => {
            FilterRecords.submitForm();
            cy.get(".mat-mdc-paginator-range-label").should(
              "not.contain",
              paginatorText
            );
            cy.get("[data-cy='selectionOption1-1RUZV1D']").click();
            FilterRecords.submitForm();
            cy.get(".mat-mdc-paginator-range-label").should(
              "contain",
              paginatorText
            );
          });
      });

      it("should not display trainees assigned to other dbcs when query string params updated in url", () => {
        cy.visit(
          "/recommendations?active=submissionDate&direction=asc&pageIndex=0&filter=underNotice&programmeName=&dbcs=1-AIIDWT"
        );

        cy.get("app-record-list .mat-mdc-table").should("exist");
        cy.get("td.cdk-column-designatedBody").each(($el) => {
          expect($el.text().trim() === "EOE").to.be.false;
        });
      });
    });

    describe("Filter by GMC status", () => {
      it("should display 'gmc status' selection list filters", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy='selectionListgmcStatus']").should("exist");
      });

      it("should display 3 selection options in the 'gmc status' selection list labelled accordingly", () => {
        FilterRecords.initFilterPanel();

        cy.get("[data-cy='selectionListgmcStatus'] .mat-mdc-list-item").should(
          "have.length",
          3
        );
        cy.get("[data-cy='selectionListgmcStatus'] .mat-mdc-list-item").each(
          ($el) => {
            expect($el.text().trim()).to.be.oneOf(formFilters.gmcStatus);
          }
        );
      });

      it("should filter summary records list by single gmc status when single option selected and submitted", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy=filter-records-button_ALLDOCTORS]")
          .should("exist")
          .click();
        cy.get("[data-cy='selectionOptionApproved']").should("exist");
        cy.get("[data-cy='selectionOptionApproved']").click();
        FilterRecords.checkButtonsDisabled("not.be.disabled");

        FilterRecords.submitForm();
        cy.get("td.cdk-column-gmcOutcome").each(($el) => {
          expect($el.text().trim()).to.equal("Approved");
        });
      });

      it("should filter summary records list by multiple gmc statuses when multiple options selected and submitted", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy=filter-records-button_ALLDOCTORS]")
          .should("exist")
          .click();
        const selectedGmcStatus = formFilters.gmcStatus.filter(
          (_, index) => index < 2
        );
        selectedGmcStatus.forEach((status) => {
          const $el = cy.get("[data-cy='selectionOption" + status + "']");
          $el.should("exist");
          $el.click();
        });

        FilterRecords.checkButtonsDisabled("not.be.disabled");

        FilterRecords.submitForm();
        cy.get("td.cdk-column-gmcOutcome").each(($el) => {
          expect($el.text().trim()).to.be.oneOf(selectedGmcStatus);
        });
      });
    });

    describe("Filter by TIS status", () => {
      it("should display 'TIS status' selection list filters", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy='selectionListtisStatus']").should("exist");
      });

      it("should display 4 selection options in the 'TIS status' selection list labelled accordingly", () => {
        FilterRecords.initFilterPanel();

        cy.get("[data-cy='selectionListtisStatus'] .mat-mdc-list-item").should(
          "have.length",
          4
        );
        cy.get("[data-cy='selectionListtisStatus'] .mat-mdc-list-item").each(
          ($el) => {
            expect($el.text().trim()).to.be.oneOf(
              formFilters.tisStatus.map((item) => item.label)
            );
          }
        );
      });

      it("should filter summary records list by single TIS status when single option selected and submitted", () => {
        FilterRecords.initFilterPanel();

        cy.get("[data-cy='selectionOptionDRAFT']").should("exist");
        cy.get("[data-cy='selectionOptionDRAFT']").click();
        FilterRecords.checkButtonsDisabled("not.be.disabled");

        FilterRecords.submitForm();

        cy.get("td.cdk-column-doctorStatus").each(($el) => {
          expect($el.text().trim()).to.equal("Draft");
        });
      });

      it("should filter summary records list by multiple TIS statuses when multiple options selected and submitted", () => {
        FilterRecords.initFilterPanel();
        const selectedTisStatus = formFilters.tisStatus.filter(
          (_, index) => index < 2
        );

        selectedTisStatus.forEach((status) => {
          const $el = cy.get("[data-cy='selectionOption" + status.value + "']");
          $el.should("exist");
          $el.click();
        });

        FilterRecords.checkButtonsDisabled("not.be.disabled");

        FilterRecords.submitForm();
        cy.get("td.cdk-column-doctorStatus").each(($el) => {
          expect($el.text().trim()).to.be.oneOf(
            selectedTisStatus.map((item) => item.label)
          );
        });
      });
    });

    describe("Filter by Programme Name", () => {
      it("should display 'programme name' filter field", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy='formfield_programmeName']").should("exist");
      });

      it("should display 'Apply filters' and 'Clear filters' buttons disabled by default", () => {
        FilterRecords.initFilterPanel();
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
        FilterRecords.initFilterPanel();
        FilterRecords.openProgrammeNameDropdown();
        cy.get("mat-option").should("have.length.above", 1);
      });

      it("should display list where first item matches input text", () => {
        FilterRecords.initFilterPanel();
        const query = "Clinical";
        FilterRecords.openProgrammeNameDropdown(query);
        cy.get("mat-option").first().should("contain", query);
      });

      it("should set value of textbox matching selected item from list", () => {
        FilterRecords.initFilterPanel();

        FilterRecords.openProgrammeNameDropdown();
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
        FilterRecords.initFilterPanel();

        FilterRecords.openProgrammeNameDropdown();
        cy.get("mat-option").eq(1).click();
        FilterRecords.checkButtonsDisabled("not.be.disabled");
      });

      it("should update summary table displaying trainees with matching programme name only", () => {
        FilterRecords.initFilterPanel();

        FilterRecords.openProgrammeNameDropdown();
        FilterRecords.checkSummaryTableIsFiltered();
      });

      it("should reset summary table results when 'Clear fliters' button is clicked", () => {
        FilterRecords.initFilterPanel();
        FilterRecords.openProgrammeNameDropdown();
        FilterRecords.resetForm();
      });
    });

    describe("Filter by TIS admin", () => {
      it("should display 'TIS admin' filter field", () => {
        FilterRecords.initFilterPanel();
        cy.get("[data-cy='formfield_admin']").should("exist");
      });

      it("should display list containing matching options when the text 'clin' is entered in 'programme name' field", () => {
        FilterRecords.initFilterPanel();
        FilterRecords.openTisAdminDropdown();
        cy.get("mat-option").should("have.length.above", 0);
      });

      it("should set value of textbox matching selected item from list", () => {
        FilterRecords.initFilterPanel();

        FilterRecords.openTisAdminDropdown();
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            cy.get("[data-cy='formfield_admin'] input").should(
              "have.value",
              value
            );
          });
      });

      it("should update summary table displaying trainees with matching TIS admin name only", () => {
        FilterRecords.initFilterPanel();

        FilterRecords.openTisAdminDropdown("Reval");
        cy.get("mat-option")
          .first()
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").first().click();
            FilterRecords.submitForm();

            cy.get("td.cdk-column-admin").each(($el) => {
              expect($el.text().trim()).to.equal(value);
            });
          });
      });
    });

    describe("Filters persist", () => {
      it("should display the filters applied when navigating to details page and back", () => {
        FilterRecords.initFilterPanel();
        FilterRecords.openProgrammeNameDropdown("General");
        FilterRecords.submitForm();
        cy.get(".mat-mdc-table tr:nth-child(2)").click();
        cy.get("app-nav-bar").should("exist");
        cy.get("#navLinkToList").should("exist").click();
        cy.get("[data-cy='formfield_programmeName'] input").should(
          "have.value",
          "General"
        );
      });
    });
  });
});
