import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { Form, Page, Table } from "../../page_objects";

let paginatorRange;

When(`I select programme name {string}`, (progName: string) => {
  Form.populateAutocomplete("Programme name", progName);
});

When(`I select TIS Admin {string}`, (adminName: string) => {
  Form.populateAutocomplete("TIS admin", adminName, null, 1);
});

When(`I click {string} button`, (label: string) => {
  Form.clickButton(label);
});

Then(
  `the table should display entries containing {string}`,
  (progName: string) => {
    Table.verifyTableRowsForValue(progName);
  }
);

When(
  `I select list item {string} from {string}`,
  (value: string, label: string) => {
    Form.populateSelectionListItem(label, value);
  }
);

Given("I have applied a filter", () => {
  cy.get(".mat-mdc-paginator-range-label").then(($element) => {
    paginatorRange = $element.text().trim();
  });
  Form.populateSelectionListItem("Designated Body", "North West London");
  Form.clickButton("Apply filters");
});

Then("no filters are applied", () => {
  cy.get(".mat-mdc-paginator-range-label").contains(paginatorRange);
});
