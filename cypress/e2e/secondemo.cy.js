describe("Demo", () => {
    it("Testcase1", () => {
      cy.log("Amazon site visits");
      cy.visit("https://www.amazon.in/");
      cy.screenshot();
      //cy.screenshot();
      //cy.get('h1').should('contain', 'Example Domain');
      cy.log("visiting completed");
  
      // Print log file content to console
      cy.printLogFile();
    });
})