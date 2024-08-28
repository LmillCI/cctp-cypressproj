const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

const installLogsPrinter =
  require
    (
      "cypress-terminal-report/src/installLogsPrinter"
    );
const installLogsCollector = {
  commandTimings: 'timestamp', collectTypes: ['cons:log',
    'cons:info',
    'cons:warn',
    'cons:error',
    'cons:debug',
    'cy:log',
    'cy:xhr',
    'cy:fetch',
    'cy:request',
    'cy:intercept',
    'cy:command'
  ]
}
const optionscollector = require 
  (
    "cypress-terminal-report/src/installLogsCollector"
  );

module.exports = defineConfig({


  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    setupNodeEvents(on, config) {
      on('after:screenshot', (details) => {
        // You can access and modify the screenshot details here
        console.log('Screenshot details:', details);

        const screenshotName = path.basename(details.path);
        console.log('Screenshot name:', screenshotName);


        const screenshotInfo = {
          TestfileName: details.specName,
          Screenshotname: screenshotName,
          path: details.path,
          //takenAt: new Date().toISOString(),

        };

        



      });
      // optionscollector({
      //   commandTimings: 'timestamp', collectTypes: ['cons:log',
      //     'cons:info',
      //     'cons:warn',
      //     'cons:error',
      //     'cons:debug',
      //     'cy:log',
      //     'cy:xhr',
      //     'cy:fetch',
      //     'cy:request',
      //     'cy:intercept',
      //     'cy:command'
      //   ]
      // })

      installLogsPrinter
        (on, {
          printLogsToConsole: 'always',
          printLogsToFile: "always",



          outputRoot: 'cypress/results/detailCommandLogs',
          outputTarget: {
            'detailCommandLogs.json': 'json',
            'out.log': 'txt',
          },


        });



      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      // on('before:run', { clearLogFile()  {
      //   const logFilePath = path.join('./cypress/logs/cypress.log');
      //     fs.writeFileSync(logFilePath, ''); // Clear the log file
      //     return null;
      // }})
      //require('cypress-timestamps/plugin')(on);

      on('task', {

      



        clearLogFile() {
          const logFilePath = path.join('./cypress/logs/cypress.log');
          fs.writeFileSync(logFilePath, ''); // Clear the log file
          return null;
        },



        log({ message, test, file }) {
          const logFilePath = path.join("./cypress/logs/cypress.log");
          const logMessage = `${new Date().toISOString()} - File: ${file}  - Test: ${test} - ${message}\n`;
          // if (fs.existsSync(logFilePath)) {
          //   const existingLog = fs.readFileSync(logFilePath, 'utf8');
          //   if (existingLog.includes(logMessage)) {
          //     return null; // Avoid writing duplicate log entries
          //   }
          // }





          fs.appendFileSync(logFilePath, console.log(logMessage));
          return null;

        },
        readLogFile() {
          const logFilePath = path.join("./cypress/logs/cypress.log");
          return new Promise((resolve, reject) => {
            fs.readFile(logFilePath, 'utf8', (err, data) => {
              if (err) {
                return reject(err);
              }
              resolve(data);
            });
          });
        }
      });


      // Step 1: Read the JSON file



    },
  },
});
