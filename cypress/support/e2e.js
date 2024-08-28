// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import 'cypress-mochawesome-reporter/register';



const options_log_collector = {
    
    commandTimings: 'timestamp', 
    collectTypes:['cons:log' ,
    'cons:info' ,
    'cons:warn' ,
    'cons:error' ,
    'cons:debug' ,
    'cy:log' ,
    'cy:xhr' ,
    'cy:fetch' ,
    'cy:request' ,
    'cy:intercept' ,
    'cy:command' ,
    
    ]

};
const  installLogsCollector = require ('cypress-terminal-report/src/installLogsCollector')

installLogsCollector(options_log_collector)

// require('cypress-timestamps/support')()

// require('cypress-timestamps/support')({
//     // terminal: true,
//     // error: true,
//     // commandLog: true,
//     // elapsed: true,
//   })






 