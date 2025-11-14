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
    cy.wait(500);
    Form.clickButton("Apply filters");
  }
);

Given(`clicked the Bulk update connection button`, () => {
  cy.get("[data-cy='enable-update-connections']").click();
});

When(`I select {string} from {string}`, (value: string, label: string) => {
  Form.populateSelect(label, value);
});

When(`I select the first {string} rows`, (count: number) => {
  Table.checkBoxInTableRow(count);
});

When(`click {string} button`, (label: string) => {
  Form.clickButton(label);
});

Then(`the dialog box should show {string}`, (message: string) => {
  Page.verifyDialogMessage(message);
});
