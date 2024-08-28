describe("Demo", () => {
    it("Testcase1", () => {
      cy.log("Google page visits");
      cy.visit("https://www.google.com/");
      cy.screenshot();
      cy.screenshot();
      //cy.get('h1').should('contain', 'Example Domain');
      cy.log("bye");
      //cy.window().then(w=>w.console.log("Hii"))
  
      // Print log file content to console
      cy.printLogFile();
    });
})
// after(() => {
//   cy.task('filterScreenshots');
// });