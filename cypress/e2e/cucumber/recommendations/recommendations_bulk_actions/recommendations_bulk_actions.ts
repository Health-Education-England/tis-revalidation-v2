import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { Page, Form, Table } from "../../page_objects";

Given(`I click the Allocate admin button`, () => {
  cy.get("app-allocate-admin-btn button").click();
});

When(`I Select Admin {string}`, (adminName: string) => {
  Form.populateAutocomplete("Select admin", adminName, null, 1);
});

When(`I select the first {string} rows`, (count: number) => {
  Table.checkBoxInTableRow(count);
});

When(`click {string} button`, (label: string) => {
  Form.clickButton(label);
  cy.wait(500);
});

Then(`the dialog box should show {string}`, (message: string) => {
  Page.verifyDialogMessage(message);
});
