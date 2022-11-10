describe("Connections Record Search", () => {
    beforeEach(() => {
      cy.login();
    });
  
    const control = "app-update-connection";
  
    it("should allow me to visit the page", () => {
      cy.visit("/connections");
    });
  
    it("should not be able to bulk update connections", () => {
      cy.visit("/connections");
      cy.get(control).should("not.exist");;
    });
  });