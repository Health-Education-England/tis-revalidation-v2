describe("Save and submit recommendation", () => {
  beforeEach(() => {
    cy.loginSession();
  });

  const openDetailPage = (tisStatus: string = "NOT_STARTED") => {
    const url = `/recommendations?active=submissionDate&direction=asc&pageIndex=0&filter=underNotice&programmeName=&gmcStatus=&tisStatus=${tisStatus}&dbcs=&admin=`;
    cy.visit(url);
    cy.get("app-record-list tbody tr").each(($el) => {
      if ($el.find("td:not(:contains('Under review'))").length != -1) {
        $el.trigger("click");
      }
    });
  };
  it("should display 404 page opened with non existent doctor", () => {
    cy.visit("/recommendation/999999999999");
    cy.get("app-info-dialog")
      .should("exist")
      .contains("Oops, something went wrong");
    cy.get("app-info-dialog button").should("exist").click();
    cy.get("app-page-not-found h1").should("exist").contains("Page not found");
  });

  it("should display button labelled 'Create recommendation' when recommendation not started", () => {
    openDetailPage();
    cy.get("[data-cy='btnCreateRecommendation']")
      .should("exist")
      .contains("Create recommendation");
  });

  it("should display button labelled 'Edit recommendation' when recommendation in draft", () => {
    openDetailPage("DRAFT");
    cy.get("[data-cy='btnCreateRecommendation']")
      .should("exist")
      .contains("Edit recommendation");
  });

  it("should display no button when recommendation submitted to GMC", () => {
    openDetailPage("SUBMITTED_TO_GMC");
    cy.get("[data-cy='btnCreateRecommendation']").should("not.exist");
  });

  it("should save draft recommendation", () => {
    openDetailPage();
    cy.get("[data-cy='btnCreateRecommendation']").should("exist").click();
    cy.get("[data-cy='btnMakeRecommendation']").should("exist").click();
    cy.get("mat-error")
      .should("exist")
      .contains("Please make a recommendation");

    cy.get('mat-select[formcontrolname="action"]').click();

    cy.get("mat-option").contains("Revalidate").click();
    cy.get("[data-cy='btnSaveDraft']").should("exist").click();
    cy.get("app-info-dialog")
      .should("exist")
      .contains("Your recommendation was successfully saved");
    cy.get("app-info-dialog button").should("exist").click();
    cy.get("[data-cy='btnCreateRecommendation']")
      .should("exist")
      .contains("Edit recommendation");
  });
  it("should submit recommendation to GMC", () => {
    openDetailPage("DRAFT");
    cy.get("[data-cy='btnCreateRecommendation']").should("exist").click();
    cy.get("[data-cy='btnMakeRecommendation']").should("exist").click();
    cy.get("[data-jasmine='buttonSubmit']")
      .should("exist")
      .should("be.disabled");
    cy.get("[data-jasmine='toggleConfirm']").should("exist").click();
    cy.get("[data-jasmine='buttonSubmit']").should("not.be.disabled").click();
    cy.get("app-info-dialog", { timeout: 30000 }).should("exist");
  });
});
