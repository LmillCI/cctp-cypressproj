describe("Logging example", () => {
  it("TC01 - Welcome to logs", () => {
    cy.log("Hiii hello Test started");
    cy.visit("https://example.com");
    cy.screenshot();
    cy.screenshot();
    //cy.get('h1').should('contain', 'Example Domain');
    cy.log("Bye Test completed");

    // Print log file content to console
    cy.printLogFile();
  });

  it("TC02 - another test case example", () => {
    cy.log("Test started Successfully");
    cy.visit("https://example.cypress.io/");
    //cy.get('h2').should('contain', 'Another Page');
    cy.log("Test completed Successfully");
    cy.screenshot();
    cy.screenshot();

    // Print log file content to console
    cy.printLogFile();
  });
  it('TC03 - Login Test', ()=>
  {
    //cy.logWithTime();
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.title().should('eq', 'OrangeHRM123');
  })

  it("TC04 - 4th example", () => {
    

    cy.visit("https://opensource-demo.orangehrmlive.com/");
       cy.get("input[name='username']").type("Admin");
       cy.get("input[name='password']").type("admin123");
       cy.get("button[type='submit']").click(); 
       cy.screenshot();
  
  });
  // after(() => {
  //   cy.task('filterScreenshots');
  // });
  
});

