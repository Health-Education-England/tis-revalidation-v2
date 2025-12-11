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

    describe("Filter by Membership End Date", () => {
      it("should display 'membership end date' filter field", () => {
        FilterRecords.initFilterPanel(path);
        cy.get("[data-cy='formfield_membershipEndDate']").should("exist");
      });

      it("should select a date range", () => {
        FilterRecords.initFilterPanel(path);
        cy.get("mat-datepicker-toggle button").click();
        cy.wait(500);
        cy.get("mat-calendar button.mat-calendar-body-cell").first().click();
        cy.wait(500);
        cy.get("mat-calendar button.mat-calendar-body-cell").last().click();
        cy.wait(500);
        cy.get("mat-date-range-input input.mat-start-date")
          .invoke("val")
          .should("not.be.empty");
        cy.get("mat-date-range-input input.mat-end-date")
          .invoke("val")
          .should("not.be.empty");
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
