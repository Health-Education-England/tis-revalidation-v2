describe("Update connections", () => {
  beforeEach(() => {
    cy.loginSession();
    cy.visit("/connection/8999999");
  });

  const updateActions = ["Add connection", "Remove connection"];
  const addConnectionReason = [
    "The doctor has a connection with this designated body",
    "Conflict of interest"
  ];
  const removeConnectionReason = [
    "Conflict of interest",
    "Doctor has retired",
    "The doctor does not have a connection with this designated body"
  ];

  const updateConnectionActionSelect =
    "[data-cy='update-connection-action'] mat-select";
  const updateConnectionActionOption =
    "[data-cy='update-connection-action-option']";
  const updateConnectionReasonSelect = "[data-cy='update-connection-reason']";
  const updateConnectionReasonOption =
    "[data-cy='update-connection-reason-option']";

  const addRemoveConnection = (
    action: string,
    reasons: string[],
    result: string,
    dbc: boolean = false
  ) => {
    cy.get(updateConnectionActionSelect).click();

    cy.get(updateConnectionActionOption).contains(action).click();
    cy.get(".mat-select-panel").should("not.exist");
    cy.get(updateConnectionReasonSelect).click();

    cy.get(updateConnectionReasonOption).each(($el) => {
      expect($el.text().trim()).to.be.oneOf(reasons);
    });
    cy.get(updateConnectionReasonOption).contains(reasons[0]).click();
    cy.get(".mat-select-panel").should("not.exist");
    if (dbc) {
      cy.get("[data-cy='update-connection-dbc']").should("exist").click();
      cy.get(".mat-select-panel").should("exist");
      cy.get("[data-cy='update-connection-dbc-option']").first().click();
    }
    cy.get("[data-cy='update-connection-save']")
      .should("not.have.class", "mat-button-disabled")
      .click();
    cy.get("app-confirm-dialog").should("exist");
    cy.get("app-confirm-dialog button").contains("Yes").click();
    // This is instead of an arbitary wait. The spinner loads async so wait for it to appear
    // and then disappear.
    cy.get("mat-spinner").should("exist");
    cy.get("mat-spinner").should("not.exist");

    cy.get("mat-dialog-container").should("exist");
    cy.get("mat-dialog-container mat-dialog-actions button").last().click();

    cy.get("app-connection [data-cy='connection-history-table']")
      .should("exist")
      .find("tr")
      .eq(1)
      .find("td")
      .eq(2)
      .should("contain", result);
  };

  it("should display 404 page opened with non existent doctor", () => {
    cy.visit("/connection/999999999999");
    cy.get("app-info-dialog")
      .should("exist")
      .contains("Oops, something went wrong");
    cy.get("app-info-dialog button").should("exist").click();
    cy.get("app-page-not-found h1").should("exist").contains("Page not found");
  });

  it("should display buttons in correct state", () => {
    cy.get(
      "app-update-connection button[data-cy='update-connection-reset']"
    ).should("have.class", "mat-button-disabled");
    cy.get(
      "app-update-connection button[data-cy='update-connection-save']"
    ).should("have.class", "mat-button-disabled");
  });

  it("should display correct actions in dropdown", () => {
    cy.get(updateConnectionActionSelect).click();

    cy.get(updateConnectionActionOption).each(($el) => {
      expect($el.text().trim()).to.be.oneOf(updateActions);
    });
  });

  it("should submit a request to disconnect a doctor", () => {
    addRemoveConnection("Remove connection", removeConnectionReason, "REMOVE");
  });
  it("should submit a request to connect a doctor", () => {
    addRemoveConnection("Add connection", addConnectionReason, "ADD", true);
  });
});
