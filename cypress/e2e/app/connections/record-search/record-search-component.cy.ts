describe("Connections Record Search", () => {
  beforeEach(() => {
    cy.loginSession();
  });

  const control = "app-update-connection";
  const currentConnectionTableHeaders = [
    "First name",
    "Last name",
    "GMC No",
    "Programme",
    "GMC Submission date",
    "Designated body",
    "Programme owner",
    "Programme membership"
  ];
  const historicConnectionTableHeaders = [
    "First name",
    "Last name",
    "GMC No",
    "Programme",
    "GMC Submission date",
    "Designated body",
    "Programme owner",
    "Programme membership",
    "Start date",
    "End date"
  ];

  it("should allow me to visit the page", () => {
    cy.visit("/connections");
  });

  it("should display 'Current Connections' by default", () => {
    cy.visit("/connections");
    cy.get("a[data-cy='filter-records-button'].mat-tab-label-active").should(
      "contain",
      "CURRENT CONNECTIONS"
    );
  });

  it("should display correct table headers in Current Connections' view", () => {
    cy.visit("/connections");
    cy.get("th").should("have.length", currentConnectionTableHeaders.length);
    cy.get("th").each(($el) => {
      expect($el.text().trim()).to.be.oneOf(currentConnectionTableHeaders);
    });
  });

  it("should display correct table headers in Historic Connections' view", () => {
    cy.visit("/connections");
    cy.get("a[data-cy='filter-records-button']")
      .contains("HISTORIC CONNECTIONS")
      .click();
    cy.wait(2000);
    cy.get("table").should("exist");
    cy.get("th").should("have.length", historicConnectionTableHeaders.length);
    cy.get("th").each(($el) => {
      expect($el.text().trim()).to.be.oneOf(historicConnectionTableHeaders);
    });
  });

  it("should not be able to bulk update connections", () => {
    cy.visit("/connections");
    cy.get(control).should("not.exist");
  });
});
