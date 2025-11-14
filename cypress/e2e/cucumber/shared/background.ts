import { Given, BeforeAll } from "@badeball/cypress-cucumber-preprocessor";
import { Page } from "../page_objects/Page";

Given(`I am logged in to Reval`, () => {
  cy.loginSession();
});

Given(`the {string} page is open`, (pageName: string) => {
  Page.load(pageName);
  cy.get(".loader").should("not.exist");
});

Given(
  `the {string} page is open with id {string}`,
  (pageName: string, id: string) => {
    Page.load(pageName, id);
  }
);

Given(`the filter panel is open`, () => {
  let isFilterPanelOpen;
  cy.get("[data-cy='toggleTableFiltersButton'] mat-icon").then((element) => {
    if (element.text() === "filter_alt") {
      isFilterPanelOpen = false;
    } else {
      isFilterPanelOpen = true;
    }
  });

  if (!isFilterPanelOpen) {
    cy.get("[data-cy='toggleFixedColumnsButton']").click();
  }
  cy.wait(500);
});

BeforeAll(() => {
  cy.writeFile(
    "./cypress/e2e/cucumber/reports/config/browserDetails.json",
    Cypress.browser
  );
});
