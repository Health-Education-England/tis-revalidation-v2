describe("Recommendations", () => {
  describe("Apply filtering to summary records list table", () => {
    beforeEach(() => {
      cy.loginSession();
    });

    const formFilters = {
      dbc: [
        { value: "1-AIIDR8", label: "Kent, Surrey and Sussex" },
        { value: "1-AIIDVS", label: "North Central and East London" },
        { value: "1-AIIDWA", label: "North West London" },
        { value: "1-AIIDWI", label: "South London" }
      ],
      gmcStatus: ["Approved", "Rejected", "Under Review"],
      tisStatus: [
        { value: "NOT_STARTED", label: "Not started" },
        { value: "SUBMITTED_TO_GMC", label: "Submitted to GMC" },
        { value: "DRAFT", label: "Draft" },
        { value: "COMPLETE", label: "Complete" }
      ]
    };
    const openProgrammeNameDropdown = (query: string = "General") => {
      cy.get("mat-option").should("not.exist");
      cy.get("[data-cy='formfield_programmeName'] input").type(query);
      cy.wait(2000);
      cy.get("mat-option").should("exist");
    };

    const openTisAdminDropdown = (query: string = "St") => {
      cy.get("mat-option").should("not.exist");
      cy.get("[data-cy='formfield_admin'] input").type(query);
      cy.wait(2000);
      cy.get("mat-option").should("exist");
    };

    const initFilterPanel = () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
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
      cy.wait(5000);
    };

    it("should open and close filter panel when toggle button is clicked", () => {
      cy.visit("/recommendations");
      cy.get("[data-cy='toggleTableFiltersButton']").click();
      cy.get(".filters-drawer-container .mat-drawer-opened").should("exist");
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
        initFilterPanel();

        cy.get(
          "[data-cy='selectionListdbcs'] .mat-list-option .mat-list-text"
        ).should("have.length", 4);
        cy.get(
          "[data-cy='selectionListdbcs'] .mat-list-option .mat-list-text"
        ).each(($el) => {
          expect($el.text().trim()).to.be.oneOf(
            formFilters.dbc.map((item) => item.label)
          );
        });
      });

      it("should filter summary records list by single dbc when single option selected and submitted", () => {
        initFilterPanel();

        cy.get("[data-cy='selectionOption1-AIIDR8']").should("exist");
        cy.get("[data-cy='selectionOption1-AIIDR8']").click();
        submitForm();
        cy.get("td.cdk-column-designatedBody").each(($el) => {
          expect($el.text().trim()).to.equal("1-AIIDR8");
        });
      });

      it("should filter summary records list by multiple dbcs when multiple options selected and submitted", () => {
        initFilterPanel();
        const selectedDbcs = formFilters.dbc
          .filter((_, index) => index < 2)
          .map((item) => item.value);
        selectedDbcs.forEach((dbc) => {
          const $el = cy.get("[data-cy='selectionOption" + dbc + "']");
          $el.should("exist");
          $el.click();
        });

        checkButtonsDisabled("not.be.disabled");

        submitForm();

        cy.get("td.cdk-column-designatedBody").each(($el) => {
          expect($el.text().trim()).to.be.oneOf(selectedDbcs);
        });
      });

      it("should filter by both 'programme name' and 'dbc' when both filters selected", () => {
        initFilterPanel();

        openProgrammeNameDropdown("Neurology KSS");
        cy.get("mat-option")
          .eq(1)
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").eq(1).click();
            cy.get("[data-cy='selectionOption1-AIIDR8']").click();

            submitForm();
            cy.get("td.cdk-column-programmeName").each(($el) => {
              expect($el.text()).to.equal(value);
            });
            cy.get("td.cdk-column-designatedBody").each(($el) => {
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
        cy.get("td.cdk-column-designatedBody").each(($el) => {
          expect($el.text() === "1-AIIDWT").to.be.false;
        });
      });
    });

    describe("Filter by GMC status", () => {
      it("should display 'gmc status' selection list filters", () => {
        initFilterPanel();
        cy.get("[data-cy='selectionListgmcStatus']").should("exist");
      });

      it("should display 3 selection options in the 'gmc status' selection list labelled accordingly", () => {
        initFilterPanel();

        cy.get(
          "[data-cy='selectionListgmcStatus'] .mat-list-option .mat-list-text"
        ).should("have.length", 3);
        cy.get(
          "[data-cy='selectionListgmcStatus'] .mat-list-option .mat-list-text"
        ).each(($el) => {
          expect($el.text().trim()).to.be.oneOf(formFilters.gmcStatus);
        });
      });

      it("should filter summary records list by single gmc status when single option selected and submitted", () => {
        initFilterPanel();

        cy.get("[data-cy='selectionOptionApproved']").should("exist");
        cy.get("[data-cy='selectionOptionApproved']").click();
        checkButtonsDisabled("not.be.disabled");

        submitForm();

        cy.get("td.cdk-column-gmcOutcome").each(($el) => {
          expect($el.text()).to.equal("Approved");
        });
      });

      it("should filter summary records list by multiple gmc statuses when multiple options selected and submitted", () => {
        initFilterPanel();
        const selectedGmcStatus = formFilters.gmcStatus.filter(
          (_, index) => index < 2
        );
        selectedGmcStatus.forEach((status) => {
          const $el = cy.get("[data-cy='selectionOption" + status + "']");
          $el.should("exist");
          $el.click();
        });

        checkButtonsDisabled("not.be.disabled");

        submitForm();
        cy.get("td.cdk-column-gmcOutcome").each(($el) => {
          expect($el.text().trim()).to.be.oneOf(selectedGmcStatus);
        });
      });
    });

    describe("Filter by TIS status", () => {
      it("should display 'TIS status' selection list filters", () => {
        initFilterPanel();
        cy.get("[data-cy='selectionListtisStatus']").should("exist");
      });

      it("should display 4 selection options in the 'TIS status' selection list labelled accordingly", () => {
        initFilterPanel();

        cy.get(
          "[data-cy='selectionListtisStatus'] .mat-list-option .mat-list-text"
        ).should("have.length", 4);
        cy.get(
          "[data-cy='selectionListtisStatus'] .mat-list-option .mat-list-text"
        ).each(($el) => {
          expect($el.text().trim()).to.be.oneOf(
            formFilters.tisStatus.map((item) => item.label)
          );
        });
      });

      it("should filter summary records list by single TIS status when single option selected and submitted", () => {
        initFilterPanel();

        cy.get("[data-cy='selectionOptionDRAFT']").should("exist");
        cy.get("[data-cy='selectionOptionDRAFT']").click();
        checkButtonsDisabled("not.be.disabled");

        submitForm();

        cy.get("td.cdk-column-doctorStatus").each(($el) => {
          expect($el.text()).to.equal("Draft");
        });
      });

      it("should filter summary records list by multiple TIS statuses when multiple options selected and submitted", () => {
        initFilterPanel();
        const selectedTisStatus = formFilters.tisStatus.filter(
          (_, index) => index < 2
        );

        selectedTisStatus.forEach((status) => {
          const $el = cy.get("[data-cy='selectionOption" + status.value + "']");
          $el.should("exist");
          $el.click();
        });

        checkButtonsDisabled("not.be.disabled");

        submitForm();
        cy.get("td.cdk-column-doctorStatus").each(($el) => {
          expect($el.text().trim()).to.be.oneOf(
            selectedTisStatus.map((item) => item.label)
          );
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
              expect($el.text()).to.equal(value);
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

    describe.only("Filter by TIS admin", () => {
      it("should display 'TIS admin' filter field", () => {
        initFilterPanel();
        cy.get("[data-cy='formfield_admin']").should("exist");
      });

      it("should display list containing matching options when the text 'clin' is entered in 'programme name' field", () => {
        initFilterPanel();
        openTisAdminDropdown();
        cy.get("mat-option").should("have.length.above", 0);
      });

      it("should set value of textbox matching selected item from list", () => {
        initFilterPanel();

        openTisAdminDropdown();
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
        initFilterPanel();

        openTisAdminDropdown("Steve");
        cy.get("mat-option")
          .first()
          .invoke("text")
          .then((value) => {
            cy.get("mat-option").first().click();
            submitForm();

            cy.get("td.cdk-column-admin").each(($el) => {
              expect($el.text()).to.equal(value);
            });
          });
      });
    });
  });
});
