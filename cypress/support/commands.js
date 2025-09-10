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
const totpKey = Cypress.env("totpKey");

Cypress.Commands.add("loginSession", () => {
  cy.session(username, () => {
    cy.visit("/");
    cy.get(".modal-content.visible-lg")
      .find("#signInFormUsername")
      .type(username);
    cy.get(".modal-content.visible-lg")
      .find("#signInFormPassword")
      .type(password, { log: false });
    cy.get(".modal-content.visible-lg")
      .find(".submitButton-customizable")
      .click();
    cy.task("generateOTP", totpKey, { log: false }).then((token) => {
      cy.get("#totpCodeInput").type(`${token}{enter}`);
    });
    cy.url().should("contain", "recommendations");
  });
});
