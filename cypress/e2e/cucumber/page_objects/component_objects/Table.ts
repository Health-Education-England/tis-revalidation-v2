import { DataTable } from "@badeball/cypress-cucumber-preprocessor";
export class Table {
  static verifyTableColumnHeaders(headers: DataTable) {
    const columns = headers.hashes().map((item) => item["columns"]);
    cy.get(".mat-mdc-table th").each(($el) => {
      expect($el.text().trim()).to.be.oneOf(columns);
    });
  }

  static verifySortTableColumns(headers: DataTable) {
    const columns = headers.hashes().map((item) => item["columns"]);
    cy.get(".mat-mdc-table th[data-testid='th-sortable']").each(($el) => {
      expect($el.text().trim()).to.be.oneOf(columns);
    });
  }

  static verifyFilterableTableColumns(headers: DataTable) {
    const columns = headers.hashes().map((item) => item["columns"]);
    cy.get(
      "table[data-testid='table-record-list'] th.dropdown div > span"
    ).each(($el) => {
      expect($el.text().trim()).to.be.oneOf(columns);
    });
  }

  static filterTableBySearchableList(filterField: string, filterValue: string) {
    const $span = cy
      .get("table[data-testid='table-record-list'] th span")
      .contains(filterField);
    $span.click();
    cy.wait(1000);
    $span
      .parents("th")
      .find("tis-searchable-list input")
      .first()
      .type(filterValue, { delay: 300 });
    $span
      .parents("th")
      .find("tis-searchable-list ul li")
      .first()
      .find("input")
      .check();
    cy.wait(1000);
  }

  static filterTableByCheckboxList(filterField: string, filterValue: string) {
    const $span = cy
      .get("table[data-testid='table-record-list'] th span")
      .contains(filterField);
    $span.click();
    cy.wait(1000);
    $span
      .parents("th")
      .find(".dropdown-menu ul li")
      .contains(filterValue)
      .click();
    cy.wait(500);
    cy.get("h2").click();
  }

  static verifyTableRowsForValue(value: string) {
    cy.get(
      "table[data-testid='table-record-list'] tbody tr, .table tbody tr"
    ).each(($el) => {
      expect($el.text().trim().toLowerCase()).to.contain(value.toLowerCase());
    });
  }

  static verifyTableRowForValues(keyValues: DataTable, index = 1) {
    keyValues.hashes().forEach((item) => {
      const columnHeader = item["label"];
      const cellValue = item["value"];
      const $tableCell = cy.get(
        `table tbody tr:nth-child(${index}) td[data-testid='${columnHeader}']`
      );
      if (cellValue.length) {
        $tableCell.contains(cellValue);
      } else {
        $tableCell.should("have.value", "");
      }
    });
  }

  static sortTable(columnName: string, sortOrder: "ascending" | "descending") {
    cy.get(".mat-sort-header-content")
      .contains(columnName)
      .parents("th")
      .click();

    if (sortOrder === "descending") {
      cy.get(".mat-sort-header-content")
        .contains(columnName)
        .parents("th")
        .click();
    }
  }

  static verifyTableIsSorted(columnName: string, sortOrder: string) {
    cy.get(
      `table[data-testid='table-record-list'] td[data-testid='${columnName}']`
    ).then(($els) => {
      const values = Cypress._.map($els, ($el) => $el.innerText);
      const sortedValues = Cypress._.orderBy(values, sortOrder);
      cy.log(sortedValues.toString());
      cy.log(values.toString());
      expect(values, "sorted values").to.deep.equal(sortedValues);
    });
  }

  static selectTableRow(rowNumber: number = 1, value?: string) {
    if (value) {
      cy.get(`table[data-testid='table-record-list'] tbody td`)
        .contains(value)
        .eq(rowNumber - 1)
        .click();
    } else {
      cy.get(
        `table[data-testid='table-record-list'] tbody tr:nth-child(${rowNumber}) td:first-child`
      ).click();
      cy.wait(1000);
    }
    cy.get("table[data-testid='table-record-list']").should("not.exist");
  }

  static checkBoxInTableRow(count = 1) {
    cy.get(
      "table[data-testid='table-record-list'] td input[type='checkbox']"
    ).each(($el, index) => {
      $el.trigger("click");
      if (index === count - 1) {
        return false;
      }
    });
  }
}
