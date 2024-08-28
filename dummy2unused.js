const jsonData = 
  {
    "data": [
      {
        "cypress\\e2e\\demo.cy.js": {
          "Demo -> Testcase1": [
            {
              "type": "cy:log",
              "severity": "success",
              "message": "swag lab visits",
              "timeString": "1723523007011"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "visit\thttps://www.saucedemo.com/v1/",
              "timeString": "1723523007030"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "screenshot\t",
              "timeString": "1723523007593"
            },
            {
              "type": "cy:log",
              "severity": "success",
              "message": "visiting completed",
              "timeString": "1723523008368"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "task\treadLogFile",
              "timeString": "1723523008379"
            }
          ]
        }
      },
      {
        "cypress\\e2e\\sampletest.cy.js": {
          "Logging example -> TC01 - Welcome to logs": [
            {
              "type": "cy:log",
              "severity": "success",
              "message": "Hiii hello Test started",
              "timeString": "1723523960304"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "visit\thttps://example.com",
              "timeString": "1723523960314"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "screenshot\t",
              "timeString": "1723523961257"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "screenshot\t",
              "timeString": "1723523961970"
            },
            {
              "type": "cy:log",
              "severity": "success",
              "message": "Bye Test completed",
              "timeString": "1723523962310"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "task\treadLogFile",
              "timeString": "1723523962323"
            }
          ],
          "Logging example -> TC02 - another test case example": [
            {
              "type": "cy:log",
              "severity": "success",
              "message": "Test started Successfully",
              "timeString": "1723523966259"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "visit\thttps://example.cypress.io/",
              "timeString": "1723523966269"
            },
            {
              "type": "cy:log",
              "severity": "success",
              "message": "Test completed Successfully",
              "timeString": "1723523967585"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "screenshot\t",
              "timeString": "1723523967595"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "screenshot\t",
              "timeString": "1723523970924"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "task\treadLogFile",
              "timeString": "1723523974012"
            }
          ],
          "Logging example -> TC03 - Login Test": [
            {
              "type": "cy:command",
              "severity": "success",
              "message": "visit\thttps://opensource-demo.orangehrmlive.com/ -> 302: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
              "timeString": "1723523978443"
            },
            {
              "type": "cy:xhr",
              "severity": "success",
              "message": "GET https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages\nStatus: 200",
              "timeString": "1723523981358"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "get\tinput[name='username']",
              "timeString": "1723523981385"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "type\tAdmin",
              "timeString": "1723523981907"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "get\tinput[name='password']",
              "timeString": "1723523982059"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "type\tadmin123",
              "timeString": "1723523982066"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "get\tbutton[type='submit']",
              "timeString": "1723523982359"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "click\t",
              "timeString": "1723523982366"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "page load\t--page loaded--",
              "timeString": "1723523982414"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "new url\thttps://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index",
              "timeString": "1723523984258"
            },
            {
              "type": "cy:xhr",
              "severity": "success",
              "message": "GET https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages",
              "timeString": "1723523984400"
            }
          ],
          "Logging example -> TC04 - 4th example": [
            {
              "type": "cy:command",
              "severity": "success",
              "message": "visit\thttps://opensource-demo.orangehrmlive.com/ -> 302: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
              "timeString": "1723523984553"
            },
            {
              "type": "cy:command",
              "severity": "success",
              "message": "title\t",
              "timeString": "1723523985366"
            },
            {
              "type": "cy:command",
              "severity": "error",
              "message": "assert\texpected **OrangeHRM** to equal **OrangeHRM123**\nActual: \t\"OrangeHRM\"\nExpected: \t\"OrangeHRM123\"",
              "timeString": "1723523985369"
            },
            {
              "type": "cy:xhr",
              "severity": "success",
              "message": "GET https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages\nStatus: 200",
              "timeString": "1723523985372"
            }
          ]
        }
      }
    ]
  }


//  const filenames = Object.keys(jsonData)
//    console.log(jsonData[filenames].length)
//    console.log(jsonData[Object.keys(jsonData)[0]])
  
  


  

// const dataArray = jsonData.data;
// const targetIndex = 1; // Change this to the index you want to access

// if (targetIndex <= dataArray.length) {
//   const fileObject = dataArray[targetIndex];
//   const fileName = Object.keys(fileObject)[0]; // Get the key of the current object
//   const fileDetails = fileObject[fileName];

//   console.log(`File Name: ${fileName}`);
//   console.log('File Details:', fileDetails);
// } else {
//   console.log('Index out of range');
// }


const dataArray = jsonData.data;

// Iterate over the data array
for (let i = 0; i < dataArray.length; i++) {
  const fileObject = dataArray[i];
  const fileName = Object.keys(fileObject)[0]; // Get the key of the current object
  const fileDetails = fileObject[fileName];

  console.log(`Index: ${i}`);
  console.log(`File Name: ${fileName}`);
  console.log('File Details:', fileDetails);
}


  