import {
  When,
  Then,
  DataTable,
  Given
} from "@badeball/cypress-cucumber-preprocessor";
import { Form, Page, Table } from "../../page_objects";

When("the page is loaded", () => {
  Page.verifyElement(".mat-mdc-table");
});

Then("the navigation links should display", (labels: DataTable) => {
  Page.verifyElements(".mat-mdc-tab-link", labels);
});

Then("the table action icons should display", () => {});

Then("the search box should display", () => {
  Page.verifyElement("#mat-input-1");
});

Then(
  "the table should display the column headings",
  (columnHeaders: DataTable) => {
    Table.verifyTableColumnHeaders(columnHeaders);
  }
);

Given("there is more than 1 page of doctors", () => {
  Page.verifyElement(".mat-mdc-paginator-navigation-next");
});

When("I navigate to the next page", () => {
  cy.get(".mat-mdc-paginator-navigation-next").click();
});

Then("the next page is displayed", () => {
  cy.url().should("include", "pageIndex=1");
});

Given("the current page number is greater than 1", () => {
  cy.get(".mat-mdc-paginator-navigation-next").click();
  cy.get(".mat-mdc-paginator-navigation-next").click();
});

When("I navigate to the previous page", () => {
  cy.get(".mat-mdc-paginator-navigation-previous").click();
});

Then("the previous page is displayed", () => {
  cy.url().should("include", "pageIndex=1");
});

Then(
  "the table should be sortable by the column headings",
  (columnHeaders: DataTable) => {
    Table.verifySortTableColumns(columnHeaders);
  }
);

When("I search for doctors with the query {string}", (query: string) => {
  Form.searchItems(query);
});

Then(
  "the table should display entries matching the query {string}",
  (query: string) => {
    Table.verifyTableRowsForValue(query);
  }
);

When("I select a row from the table", () => {
  Table.selectTableRow();
});

Then(
  "the details page for doctor with name of {string} should be displayed",
  (fieldValue: string) => {
    Page.verifyElement(".details-list-item", fieldValue);
  }
);
