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

When(`I select {string} from {string}`, (value: string, label: string) => {
  Form.populateSelect(label, value);
});

When("I select a row from the table", () => {
  Table.selectTableRow();
});

When(`click {string} button`, (label: string) => {
  Form.clickButton(label);
});

Then(`the dialog box should show {string}`, (message: string) => {
  Page.verifyDialogMessage("Success");
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
