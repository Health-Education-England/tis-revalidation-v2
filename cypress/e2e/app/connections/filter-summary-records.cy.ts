import { FilterRecords } from "../records/filter-summary-records-po";

describe("Connections", () => {
  describe("Apply filtering to summary records list table", () => {
    beforeEach(() => {
      cy.loginSession();
    });

    const path = "/connections";

    it("should open and close filter panel when toggle button is clicked", () => {
      cy.visit(path);
      FilterRecords.toggleFilterPanel();
    });

    describe("Filter by GMC submission date", () => {
      it("should display 'GMC submission date' filter field", () => {
        FilterRecords.initFilterPanel(path);
        cy.get("[data-cy='formfield_submissionDate']").should("exist");
      });

      it("should select a date range", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.selectDateRange("[data-cy='formfield_submissionDate']");
      });

      it("should update url to include submission date params", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.populateDateRange("[data-cy='formfield_submissionDate']");
        cy.url().should(
          "contain",
          "submissionDateFrom=2026-01-01&submissionDateTo=2026-01-10"
        );
      });
    });

    describe("Filter by Membership End Date", () => {
      it("should display 'membership end date' filter field", () => {
        FilterRecords.initFilterPanel(path);
        cy.get("[data-cy='formfield_membershipEndDate']").should("exist");
      });

      it("should select a date range", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.selectDateRange(
          "[data-cy='formfield_membershipEndDate']"
        );
      });

      it("should update url to include membership end date params", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.populateDateRange(
          "[data-cy='formfield_membershipEndDate']"
        );
        cy.url().should(
          "contain",
          "membershipEndDateFrom=2026-01-01&membershipEndDateTo=2026-01-10"
        );
      });
    });

    describe("Filter by Last connection updated", () => {
      it("should display 'membership end date' filter field", () => {
        FilterRecords.initFilterPanel(path);
        cy.get("[data-cy='formfield_lastConnectionDateTime']").should("exist");
      });

      it("should select a date range", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.selectDateRange(
          "[data-cy='formfield_lastConnectionDateTime']"
        );
      });

      it("should update url to include last connection updated date params", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.populateDateRange(
          "[data-cy='formfield_lastConnectionDateTime']"
        );
        cy.url().should(
          "contain",
          "formfield_lastConnectionDateTimeFrom=2026-01-01&formfield_lastConnectionDateTimeTo=2026-01-10"
        );
      });
    });

    describe("Filter by Programme Name", () => {
      it("should display 'programme name' filter field", () => {
        FilterRecords.initFilterPanel(path);
        cy.get("[data-cy='formfield_programmeName']").should("exist");
      });

      it("should display list containing matching options when the text is entered in 'programme name' field", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.openProgrammeNameDropdown();
        cy.get("mat-option").should("have.length.above", 1);
      });

      it("should display list where first item matches input text", () => {
        FilterRecords.initFilterPanel(path);
        const query = "General";
        FilterRecords.openProgrammeNameDropdown(query);
        cy.get("mat-option").first().should("contain", query);
      });

      it("should update summary table displaying trainees with matching programme name only", () => {
        FilterRecords.initFilterPanel(path);

        FilterRecords.openProgrammeNameDropdown();

        FilterRecords.checkSummaryTableIsFiltered();
      });

      it("should reset summary table results when 'Clear fliters' button is clicked", () => {
        FilterRecords.initFilterPanel(path);
        FilterRecords.openProgrammeNameDropdown();
        FilterRecords.resetForm();
      });
    });
  });
});
