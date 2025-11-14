import {
  Given,
  When,
  Then,
  DataTable
} from "@badeball/cypress-cucumber-preprocessor";
import { Page, Form, Table } from "../../page_objects";

Given(
  `I have filtered the list by {string} equal to {string}`,
  (label: string, value: string) => {
    Form.populateSelectionListItem(label, value);
    Form.clickButton("Apply filters");
  }
);

Given("I want to make a deferral", () => {
  Form.populateSelectionListItem("TIS status", "Not started");
  Form.clickButton("Apply filters");
  Table.selectTableRow(4);
  Form.clickButton("Create recommendation");
  Form.populateSelect("Make a recommendation", "Defer");
});

When(`I select {string} from {string}`, (value: string, label: string) => {
  Form.populateSelect(label, value);
});

When(`I select the default focus date from the calendar`, () => {
  cy.get("[data-cy='deferDate'] mat-datepicker-toggle button").click();
  cy.wait(500);
  cy.get("mat-datepicker-content button.mat-calendar-body-active").click();
  cy.wait(500);
});

When(`I enter {string} to {string}`, (value: string, label: string) => {
  Form.populateTextArea(label, value);
});

When("I select a row from the table", () => {
  Table.selectTableRow(9);
});

Then(
  "neither the {string} nor {string} buttons are visible",
  (createButtonLabel: string, editButtonLabel: string) => {
    Page.verifyElement("button", createButtonLabel, "not.exist");
    Page.verifyElement("button", editButtonLabel, "not.exist");
  }
);

When(`I click {string} button`, (label: string) => {
  Form.clickButton(label);
});

When(`I toggle {string} button`, (label: string) => {
  cy.get("[data-jasmine='toggleConfirm'] label")
    .contains(label)
    .parent()
    .find("button")
    .click();
  cy.wait(500);
});

Then("the required fields are highlighted", (labels: DataTable) => {
  Form.verifyFormFieldErrors(labels);
});

Then(`the dialog box should show {string}`, (message: string) => {
  Page.verifyDialogMessage(message);
  Form.clickButton("Dismiss");
});

Then(
  "Current designated body should show {string}",
  (designatedBody: string) => {
    Page.verifyElement("mat-card-content", designatedBody);
  }
);

Then("the Connection history should include", (keyValues: DataTable) => {
  Table.verifyTableRowForValues(keyValues);
});
