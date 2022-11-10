describe("Connections Connection Component", () => {
    beforeEach(() => {
      cy.login();
    });
  
    const control = "app-update-connetions-btn";
    const recordListItems = "tr[arialabel=record-list-row]"
  
    it("should allow me to visit the page", () => {
      cy.visit("/connections");
    });
  
    it("should not be able to bulk update connections", () => {
      cy.visit("/connections");
      cy.get(recordListItems).eq(0).click();
      cy.location('pathname', {timeout: 60000})
        .should('include', '/connection/');
      cy.get(control).should("not.exist");
    });
  });