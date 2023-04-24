// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const username = Cypress.env("username");
const password = Cypress.env("password");

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("form").eq(1).as("form");
  cy.get("@form").find(".idpButton-customizable").click();
  cy.get("#kc-form-wrapper").find("#username").type(username);
  cy.get("#kc-form-wrapper").find("#password").type(password);
  cy.get("#kc-form-wrapper").find("#kc-login").click();

  cy.get("app-records .mat-table").should("exist");
});

Cypress.Commands.add("loginSession", () => {
  cy.session(username, () => {
    cy.visit("/");
    cy.get("form").eq(1).as("form");
    cy.get("@form").find(".idpButton-customizable").click();
    cy.get("#kc-form-wrapper").find("#username").type(username);
    cy.get("#kc-form-wrapper").find("#password").type(password);
    cy.get("#kc-form-wrapper").find("#kc-login").click();
    cy.get("app-records .mat-table").should("exist");
  });
});
