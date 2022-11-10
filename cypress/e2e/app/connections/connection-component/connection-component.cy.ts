describe("Connections Connection Component", () => {
    beforeEach(() => {
      cy.login();
    });
  
    const button = "app-update-connetions-btn";
  
    it("should allow me to visit the page", () => {
      cy.visit("/connections");
    });
  
    it("should not be able to bulk update connections", () => {
      cy.get(button).should("not.exist");;
    });
  });