describe("Connections Summary Records List", () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/connections");
  });

  const tableColumnHeaders = [
    "First name",
    "Last name",
    "GMC No",
    "Current programme name",
    "GMC Submission date",
    "GMC Designated body",
    "TIS Designated body",
    "Programme owner",
    "Programme membership"
  ];
  const sortableColumns = [
    "First name",
    "Last name",
    "GMC Designated body",
    "Programme owner"
  ];

  const filters = [
    "DISCREPANCIES",
    "CURRENT CONNECTIONS",
    "FAILED GMC UPDATES"
  ];

  it("should display correct page filter tabs", () => {
    cy.get("app-record-list-filters a").each(($el) => {
      expect($el.text().trim()).to.be.oneOf(filters);
    });
  });

  it("should load correct page filter", () => {
    cy.get("[data-cy='filter-records-button_DISCREPANCIES'").click();
    cy.location("search", { timeout: 5000 }).should(
      "include",
      "filter=discrepancies"
    );
    cy.get("[data-cy='filter-records-button_CURRENTCONNECTIONS'").click();
    cy.location("search", { timeout: 5000 }).should(
      "include",
      "filter=currentConnections"
    );
  });

  it("should display data in a table with correct columns", () => {
    cy.get("app-record-list .mat-table th").each(($el) => {
      expect($el.text().trim()).to.be.oneOf(tableColumnHeaders);
    });
  });

  it("should display correct sortable columns.", () => {
    cy.get(
      "app-record-list .mat-table th .mat-sort-header-container[role='button']"
    ).each(($el) => {
      expect($el.text().trim()).to.be.oneOf(sortableColumns);
    });
  });

  it("should toggle bulk update connections", () => {
    cy.get("[data-cy='enable-update-connections']").click();
    cy.get("app-update-connection").should("exist");
    cy.get(
      ".mat-table th mat-checkbox[data-cy='select-all-records-checkbox']"
    ).should("exist");
    cy.get(
      ".mat-table td mat-checkbox[data-cy='select-record-checkbox']"
    ).should("exist");
    cy.get("[data-cy='disable-update-connections']").click();
    cy.get("app-update-connection").should("not.exist");
  });
});
