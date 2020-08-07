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

Cypress.Commands.add("login", () => {
  cy.visit("https://stage-revalidation.tis.nhs.uk");
  cy.get("form").eq(1).as("form");
  cy.get("@form").find("#signInFormUsername").type("demouser@hee.nhs.uk");
  cy.get("@form").find("#signInFormPassword").type("T3CagXRI7SKgQj9A-");
  cy.get("@form").submit();
});
