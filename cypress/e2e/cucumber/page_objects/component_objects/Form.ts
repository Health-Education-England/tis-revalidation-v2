import { Page } from "../Page";
import { DataTable } from "@badeball/cypress-cucumber-preprocessor";

export class Form {
  // ### VERIFY ###
  static readonly keyTypeDelay = 100;
  static verifyFormLabels(keyValues: DataTable, selector: string = "label") {
    const formLabels = keyValues.hashes().map((item) => item["label"]);
    cy.get(selector).each(($el) => {
      expect($el.text().trim()).to.be.oneOf(formLabels);
    });
  }

  static verifyDropdownItems(selector: string, keyValues: DataTable) {
    const labels = keyValues.hashes().map((item) => item["label"]);
    cy.get(selector).each(($el) => {
      expect($el.text().trim()).to.be.oneOf(labels);
    });
  }
  static verifyInputValue(
    fieldLabel: string,
    value: string,
    assertion: string = "contain",
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);
    if (assertion === "contain") {
      matchingElement
        .parent()
        .find("input")
        .invoke("val")
        .should(assertion, value);
    } else {
      matchingElement.parent().find("input").should(assertion, value);
    }
  }

  static verifySelectedValue(
    fieldLabel: string,
    value: string,
    assertion: string = "contain",
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);
    matchingElement
      .parent()
      .find("select option:selected")
      .should(assertion, value);
  }

  static verifyMultiDropdownValue(
    fieldLabel: string,
    value: string,
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);
    const values: string[] = [];

    matchingElement
      .parent()
      .find("tis-dropdown")
      .each(($el) => {
        values.push($el.find("input").val().toString());
      })
      .then(() => {
        expect(values.join()).to.contain(value);
      });
  }

  static verifyTextInputError(
    fieldLabel: string,
    assertion: string = "exist",
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);
    matchingElement.find("~ tis-error-messages .form-error").should(assertion);
  }

  static verifyDropdownInputError(
    fieldLabel: string,
    assertion: string = "exist",
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);

    matchingElement
      .parents("tis-dropdown")
      .find("tis-error-messages .form-error")
      .should(assertion);
  }

  static verifyAutocompleteInputError(
    fieldLabel: string,
    assertion: string = "exist",
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);

    matchingElement
      .parents(".form-group")
      .find("tis-error-messages .form-error")
      .should(assertion);
  }

  static verifyDateInputError(
    fieldLabel: string,
    assertion: string = "exist",
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);

    matchingElement
      .parents("tis-date-picker")
      .find("+ tis-error-messages .form-error")
      .should(assertion);
  }

  static verifyAmterialInputError(
    fieldLabel: string,
    assertion: string = "exist",
    index?: number
  ) {
    const matchingElement = this.matchLabelElement(fieldLabel, index);
    matchingElement
      .parents("mat-form-field")
      .find("mat-error")
      .should(assertion);
  }

  static verifyFormFieldErrors(
    keyValues: DataTable,
    assertion: string = "exist"
  ) {
    keyValues.hashes().forEach((item) => {
      const inputLabel = item["label"];
      const inputType = item["type"] || "text";
      switch (inputType) {
        case "text":
          this.verifyTextInputError(inputLabel, assertion);
          break;

        case "date":
          this.verifyDateInputError(inputLabel, assertion);
          break;

        case "dropdown":
          this.verifyDropdownInputError(inputLabel, assertion);
          break;

        case "autocomplete":
          this.verifyAutocompleteInputError(inputLabel, assertion);
          break;
        case "material":
          this.verifyAmterialInputError(inputLabel, assertion);
          break;
      }
    });
  }

  static verifyFormValues(keyValues: DataTable) {
    keyValues.hashes().forEach((item) => {
      const inputLabel = item["label"];
      const inputValue = item["value"];
      const inputType = item["type"] || "text";
      switch (inputType) {
        case "text":
          this.verifyInputValue(inputLabel, inputValue);
          break;
        case "select":
          this.verifySelectedValue(inputLabel, inputValue);
          break;
        case "multi-dropdown":
          this.expandMultiDropdown(inputLabel);
          this.verifyMultiDropdownValue(inputLabel, inputValue);
      }
    });
  }

  static verifyInputStatus(
    fieldLabel: string,
    fieldType: string = "text",
    index?: number,
    status: "readonly" | "disabled" = "readonly"
  ) {
    let selector: string;
    switch (fieldType) {
      case "text":
        selector = "input";
        break;
      case "select":
        selector = "select";
        break;
    }
    const matchingElement = this.matchLabelElement(fieldLabel, index);
    matchingElement
      .parents(".form-group")
      .find(selector)
      .should("have.attr", status, status);
  }

  static verifyFormFieldsStatus(
    keyValues: DataTable,
    status: "readonly" | "disabled"
  ) {
    keyValues.hashes().forEach((item) => {
      const inputLabel = item["label"];
      const inputType = item["type"] ?? "text";
      this.verifyInputStatus(inputLabel, inputType, null, status);
    });
  }

  static verifyMultipleValues(keyValues) {
    keyValues.hashes().forEach((item) => {
      const inputLabel = item["label"];
      const matchingElement = this.matchLabelElement(inputLabel);
      matchingElement
        .parents(".form-group")
        .find('button[data-testid="button-add-input"]')
        .should("exist");
    });
  }

  static verifySaveButtonIsDisabled() {
    cy.get("#saveBt").should("be.disabled");
  }

  /// ### POPULATE FORM ###

  static populateAutocomplete(label, value, index?: number, optionIndex = 2) {
    const matchingElement = this.matchLabelElement(label, index);

    matchingElement
      .parent()
      .find("input")
      .clear({ force: true })
      .type(value, { delay: this.keyTypeDelay });
    cy.wait(500);
    cy.get(".cdk-overlay-container")
      .find(`.mat-mdc-autocomplete-panel mat-option:nth-child(${optionIndex})`)
      .contains(value)
      .click({ force: true });
    cy.wait(500);
  }

  static populateTagsAutocomplete(label, value, index?: number) {
    this.matchLabelElement(label, index)
      .find("+ tis-tags-input input")
      .type(value, { delay: this.keyTypeDelay });
    this.matchLabelElement(label, index)
      .find("+ tis-tags-input .dropdown-item")
      .click();
  }

  static populateNgAutocomplete(label, value, index?: number) {
    const matchingElement = this.matchLabelElement(label, index);
    matchingElement
      .parents(".form-group")
      .find("input[type='text']")
      .type(value, { delay: this.keyTypeDelay });
    matchingElement
      .parents(".form-group")
      .find(".ng-select .ng-option:first-child")
      .click();
  }

  static populateDropdown(label, value, index?: number) {
    const matchingElement = this.matchLabelElement(label, index);
    matchingElement.parents("tis-dropdown").find("input").click();
    cy.wait(1000);
    matchingElement
      .parents("tis-dropdown")
      .find("button")
      .contains(value)
      .click();
  }

  static populateSelect(label, value, index?: number) {
    this.matchLabelElement(label, index)
      .parent()
      .find("mat-select")
      .click({ force: true });
    cy.wait(500);
    cy.get(".mat-mdc-select-panel mat-option")
      .contains(value)
      .click({ force: true });
    cy.wait(500);
  }

  static populateSelectionListItem(label, value) {
    this.matchLabelElement(label)
      .parent()
      .find("mat-selection-list")
      .contains(value)
      .click({ force: true });
    cy.wait(500);
  }

  static populateDateInput(label, value, index?: number) {
    const matchingElement = this.matchLabelElement(label, index);
    const inputElement = matchingElement.parents(".form-group").find("input");

    inputElement.clear({ force: true });
    cy.wait(500);
    if (value) {
      if (Array.from(value)[0] === "$") {
        inputElement.type(Page.generateValue(value));
      } else {
        inputElement.type(value);
      }
    }
  }

  static populateTextInput(label, value, index?: number) {
    const matchingElement = this.matchLabelElement(label, index);
    const inputElement = matchingElement.find(" + input");
    inputElement.clear({ force: true });
    if (value) {
      if (Array.from(value)[0] === "$") {
        inputElement.type(Page.generateValue(value));
      } else {
        inputElement.type(value);
      }
    }
  }

  static populateTextArea(label, value, index?: number) {
    const matchingElement = this.matchLabelElement(label, index);
    const inputElement = matchingElement.find(" + textarea");
    inputElement.clear({ force: true });
    if (value) {
      if (Array.from(value)[0] === "$") {
        inputElement.type(Page.generateValue(value));
      } else {
        inputElement.type(value);
      }
    }
    cy.wait(500);
  }

  static populateFormValues(
    keyValues,
    index?: number,
    isMultipleInput: boolean = false
  ) {
    const randomValues = [];

    keyValues.hashes().forEach((item) => {
      const inputLabel = item["label"];
      let inputValue = item["value"];
      const inputType = item["type"] || "text";

      if (Array.from(inputValue)[0] === "$") {
        inputValue = Page.generateValue(inputValue);
        randomValues.push({ key: `${inputLabel}`, value: `${inputValue}` });
      }

      switch (inputType) {
        case "text":
          this.populateTextInput(inputLabel, inputValue, index);
          break;
        case "textarea":
          this.populateTextArea(inputLabel, inputValue, index);
          break;
        case "ng-autocomplete":
          this.populateNgAutocomplete(inputLabel, inputValue, index);
          break;

        case "tags-autocomplete":
          this.populateTagsAutocomplete(inputLabel, inputValue, index);
          break;
        case "autocomplete":
          this.populateAutocomplete(inputLabel, inputValue, index);
          break;

        case "add-autocomplete":
          this.expandMultiDropdown(inputLabel);
          this.matchLabelElement(inputLabel, index)
            .parents(".form-group")
            .find("[data-testid='button-add-input']")
            .click();
          this.populateAutocomplete(inputLabel, inputValue, index);
          break;

        case "dropdown":
          this.populateDropdown(inputLabel, inputValue, index);
          break;
        case "select":
          this.populateSelect(inputLabel, inputValue);
          break;
        case "date":
          this.populateDateInput(inputLabel, inputValue);
          break;
      }
    });
    return randomValues;
  }

  private static expandMultiDropdown(label) {
    this.matchLabelElement(label)
      .parents(".form-group")
      .find("[data-testid='multi-input-button-wrapper'] button")
      .each(($el) => {
        if ($el.text().includes("Expand")) {
          $el.trigger("click");
        }
      });
    cy.wait(500);
  }

  private static matchLabelElement(label: string, index?: number) {
    const matchedElements = cy.get("label").then(($els) => {
      return Array.from($els).filter((el) => el.innerText.trim() === label);
    });
    if (index >= 0) {
      return matchedElements.eq(index);
    } else {
      return matchedElements.last();
    }
  }

  // ### BUTTONs ###

  static clickSaveButton() {
    cy.get("#saveBt").click();
  }

  static clickDeleteButton() {
    cy.get("#deleteBt").click();
  }

  static clickButton(label?: string, element: string = "button") {
    if (label) {
      cy.get(element).contains(label).last().click();
    } else {
      cy.get(element).last().click();
    }
    cy.wait(500);
  }

  static searchItems(
    query: string,
    selector = "input[data-testid='input-search']"
  ) {
    cy.get(selector).type(`${query}{enter}`, { force: true });
    cy.get(".loader").should("not.exist");
    cy.wait(2000);
  }

  // ### CONFIRM ###

  static confirmModal(buttonLabel: string, message?: string) {
    cy.wait(1000);
    cy.get("tis-confirm").should("exist");
    if (message) {
      cy.get("tis-confirm .confirm-prompt").contains(message);
    }
    cy.get("tis-confirm button").contains(buttonLabel).click();
  }

  static ngConfirmAction(label: string) {
    cy.wait(1000);
    cy.get("ngb-modal-window .modal-content button").contains(label).click();
  }
}
