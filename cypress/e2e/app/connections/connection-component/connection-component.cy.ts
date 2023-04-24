describe("Connections Connection Component", () => {
  beforeEach(() => {
    cy.loginSession();
  });

  const updateComponent = "app-update-connection";
  const bulkUpdateControl = "app-update-connetions-btn";
  const connectionHistoryTable = "[data-cy='connection-history-table']";
  const programmeHistoryTable = "[data-cy='programme-history-table']";
  const recordListItems = "tr[arialabel=record-list-row]";
  const initConnectionsPage = () => {
    cy.visit("/connections");
    cy.get(".mat-tab-link").first().should("contain", "CONNECTIONS");
  };
  it("should not be able to bulk update connections", () => {
    initConnectionsPage();
    cy.get(recordListItems).eq(0).click();
    cy.location("pathname", { timeout: 60000 }).should(
      "include",
      "/connection/"
    );
    cy.get(bulkUpdateControl).should("not.exist");
  });

  it("should not be able to update connections", () => {
    initConnectionsPage();
    cy.get(recordListItems).eq(0).click();
    cy.location("pathname", { timeout: 60000 }).should(
      "include",
      "/connection/"
    );
    cy.get(updateComponent).should("not.exist");
  });

  it("should not be able to see connection history", () => {
    initConnectionsPage();
    cy.get(recordListItems).eq(0).click();
    cy.location("pathname", { timeout: 60000 }).should(
      "include",
      "/connection/"
    );
    cy.get(connectionHistoryTable).should("exist");
  });

  it("should not be able to see programme history", () => {
    initConnectionsPage();
    cy.get(recordListItems).eq(0).click();
    cy.location("pathname", { timeout: 60000 }).should(
      "include",
      "/connection/"
    );
    cy.get(programmeHistoryTable).should("not.exist");
  });
});
