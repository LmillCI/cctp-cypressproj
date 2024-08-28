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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('logToFile', (message) => {
//     cy.task('log', message);
//   });

//Cypress.Commands.add('logDetailed', (message, suite, test, file) => {
// const currentTest = Cypress.currentTest;
// const suite = currentTest.parent.title;
// const test = currentTest.title;
// const file = currentTest.invocationDetails.relativeFile;
//cy.task('logDetailed', { message, suite, test, file });
//   });

//   Cypress.Commands.add('printLogFile', () => {
//     cy.task('readLogFile').then((log) => {
//       console.log('Cypress Log:\n', log);
//     });
//   });

// let currentTestContext = {};

// Cypress.Commands.add('logDetailed', (message) => {
//   if (!currentTestContext) {
//     throw new Error('Current test context is not set.');
//   }

//   const test = currentTestContext.title || 'Unknown Test';
//  // const suite = currentTestContext.parent?.title || 'Unknown Suite';
//   const file = currentTestContext.invocationDetails?.relativeFile || 'Unknown File';

//   cy.task('logDetailed', { message, test, file });
// });

// Cypress.Commands.add('printLogFile', () => {
//   cy.task('readLogFile').then((log) => {
//     console.log('Cypress Log:\n', log);
//   });
// });

// Cypress.on('test:before:run', (test, runnable) => {
//   currentTestContext = {
//     title: test.title,
//     parent: test.parent,
//     invocationDetails: runnable.invocationDetails
//   };
// });


before(() => {
  //cy.task('clearLogFile');
});
let commands = [];
let testAttributes;

Cypress.on("test:before:run", () => {
  commands.length = 0;
});
Cypress.on("test:after:run", (attributes) => {
  /* eslint-disable no-console */
  console.log(
    'Test "%s" has finished in %dms',
    attributes.title,
    attributes.duration
  );
  console.table(commands);
  testAttributes = {
    title: attributes.title,
    duration: attributes.duration,
    commands: Cypress._.cloneDeep(commands),
  };
});

Cypress.Commands.add('logWithTime', (message) => {
  const now = new Date();
  const dateString = now.toISOString().split('T')[0];
  const timeString = now.toTimeString().split(' ')[0] + ':' + now.getMilliseconds().toString().padStart(3, '0');
   cy.log(`${dateString} ${timeString} - ${message}`);
  
});




Cypress.on("command:start", (c) => {
  
  commands.push({ name: c.attributes.name, started: +new Date() });
});
Cypress.on("command:end", (c) => {
  const lastCommand = commands[commands.length - 1];
  if (lastCommand.name !== c.attributes.name) {
    throw new Error("Last command is wrong");
  }

  lastCommand.endedAt = +new Date();
  lastCommand.elapsed = lastCommand.endedAt - lastCommand.started;
  
  
});
Cypress.Commands.add("logDetailed", (message) => {
  const currentTestContext = Cypress.mocha.getRunner().test;
  const test = currentTestContext.title || "Unknown Test";
  const file =
    currentTestContext.invocationDetails?.relativeFile || "Unknown File";

  cy.task("logDetailed", { message, test, file });
});

Cypress.Commands.add("printLogFile", () => {
  cy.task("readLogFile").then((log) => {
    console.log("Cypress Log:\n", log);
  });
});



// Cypress.on('test:after:run', (test, runnable) => {
//     const message = `${test.title} - ${test.state === 'passed' ? 'Test completed Successfully' : 'Test failed'}`;
//     //const suite = runnable.parent.title;
//     const file = runnable.invocationDetails.relativeFile;

//     cy.task('logDetailed', { message,  test: test.title, file });
//   });

//   Cypress.Commands.add('printLogFile', () => {
//     cy.task('readLogFile').then((log) => {
//       console.log('Cypress Log:\n', log);
//     });
//   });
