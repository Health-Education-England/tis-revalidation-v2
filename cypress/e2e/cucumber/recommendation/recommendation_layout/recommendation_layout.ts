import { Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { Page } from "../../page_objects";

Then(`the doctor detail panel should include`, (labels: DataTable) => {
  Page.verifyElements(".details-list-item-title", labels);
});
