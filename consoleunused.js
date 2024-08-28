// // const fs = require('fs');
// // const path = require('path');
// // const jsonpath = require('jsonpath');

// // // Function to recursively read all files in a directory
// // function readAllFiles(dir, fileList = []) {
// //   const files = fs.readdirSync(dir);
// //   files.forEach(file => {
// //     const filePath = path.join(dir, file);
// //     if (fs.statSync(filePath).isDirectory()) {
// //       readAllFiles(filePath, fileList);
// //     } else {
// //       fileList.push(filePath);
// //     }
// //   });
// //   return fileList;
// // }

// // // Function to attach screenshot name in the message
// // function attachScreenshotNameInMessage(logData, screenshotFiles) {
// //   const screenshotCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.message=="screenshot\t")]');
// //   const failedCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.severity=="error")]');

// //   let screenshotIndex=0;
  
// //   screenshotCommands.forEach((command, index) => {
// //     if (screenshotFiles[index]) {
// //       const screenshotName = path.basename(screenshotFiles[index]);
// //       command.message = `screenshot\t${screenshotName}`;
// //       console.log(screenshotName);
// //     }
// //   });
// //   failedCommands.forEach(command => {
// //     if (screenshotFiles[screenshotIndex]) {
// //       const screenshotName1= path.basename(screenshotFiles[screenshotIndex]);
// //       command.message = `screenshot\t${screenshotName1}`;
// //       console.log(screenshotName1);
// //       screenshotIndex++;
// //     }
// //   });



// //   return logData;
// // }

// // // Read the JSON file
// // fs.readFile('./cypress/results/detailCommandLogs/detailCommandLogs.json', 'utf8', (err, data) => {
// //   if (err) {
// //     console.error('Error reading the file:', err);
// //     return;
// //   }

// //   let logData;
// //   try {
// //     logData = JSON.parse(data);
// //   } catch (parseErr) {
// //     console.error('Error parsing JSON:', parseErr);
// //     return;
// //   }

// //   // Read all screenshot filenames from the screenshots directory
// //   const screenshotsDir = './cypress/screenshots';
// //   const screenshotFiles = readAllFiles(screenshotsDir).filter(file => /\.(png|jpg|jpeg)$/.test(file));

// //   // Update the log data
// //   const updatedLogData = attachScreenshotNameInMessage(logData, screenshotFiles);

// //   // Write the updated JSON back to the file
// //   fs.writeFile('./cypress/results/detailCommandLogs/detailCommandLogs.json', JSON.stringify(updatedLogData, null, 2), 'utf8', (writeErr) => {
// //     if (writeErr) {
// //       console.error('Error writing the file:', writeErr);
// //       return;
// //     }
// //     console.log('File successfully updated!');
// //   });
// // });




// const fs = require('fs');
// const path = require('path');
// const jsonpath = require('jsonpath');

// // Function to recursively read all files in a directory
// function readAllFiles(dir, fileList = []) {
//   const files = fs.readdirSync(dir);
//   files.forEach(file => {
//     const filePath = path.join(dir, file);
//     if (fs.statSync(filePath).isDirectory()) {
//       readAllFiles(filePath, fileList);
//     } else {
//       fileList.push(filePath);
//     }
//   });
//   return fileList;
// }

// // Function to attach screenshot name in the message
// function attachScreenshotNameInMessage(logData, screenshotFiles) {
//   const screenshotCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.message=="screenshot\t")]');
//   const failedCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.severity=="error")]');
  
//   // Filter screenshots for explicit commands and failed tests
//   const commandScreenshots = screenshotFiles.filter(file => !/failed/.test(file));
//   const failedScreenshots = screenshotFiles.filter(file => /failed/.test(file));


  
  
//   screenshotCommands.forEach((command, index) => {
//     if (commandScreenshots[index]) {
//       const screenshotName = path.basename(commandScreenshots[index]);
//       command.message = `screenshot\t${screenshotName}`;
//       console.log(screenshotName);
//     }
//   });

//   failedCommands.forEach((command, index) => {
//     if (failedScreenshots[index]) {
//       const screenshotName = path.basename(failedScreenshots[index]);
//       command.message = `screenshot\t${screenshotName}`;
//       console.log(screenshotName);
//     }
//   });

//   return logData;
// }

// // Read the JSON file
// fs.readFile('./cypress/results/detailCommandLogs/detailCommandLogs.json', 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading the file:', err);
//     return;
//   }

//   let logData;
//   try {
//     logData = JSON.parse(data);
//   } catch (parseErr) {
//     console.error('Error parsing JSON:', parseErr);
//     return;
//   }

  

//   // Read all screenshot filenames from the screenshots directory
//   const screenshotsDir = './cypress/screenshots';
//   const screenshotFiles = readAllFiles(screenshotsDir).filter(file => /\.(png|jpg|jpeg)$/.test(file));

//   // Update the log data
//   const updatedLogData = attachScreenshotNameInMessage(logData, screenshotFiles);

//   // Write the updated JSON back to the file
//   fs.writeFile('./cypress/results/detailCommandLogs/detailCommandLogs.json', JSON.stringify(updatedLogData, null, 2), 'utf8', (writeErr) => {
//     if (writeErr) {
//       console.error('Error writing the file:', writeErr);
//       return;
//     }
//     console.log('File successfully updated!');
//   });
// });





const fs = require('fs');
const path = require('path');
const jsonpath = require('jsonpath');

// Function to recursively read all files in a directory
function readAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      readAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Function to get the timestamp from a filename
function getTimestampFromFilename(filename) {
  const match = filename.match(/(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2})/);
  return match ? new Date(match[1].replace(/-/g, ':').replace('T', ' ')) : null;
}

// Function to attach screenshot name in the message
function attachScreenshotNameInMessage(logData, screenshotFiles) {
  const screenshotCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.message=="screenshot\t")]');
  const failedCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.severity=="error")]');

  // Sort screenshots by timestamp
  screenshotFiles.sort((a, b) => getTimestampFromFilename(a) - getTimestampFromFilename(b));

  // Filter screenshots for explicit commands and failed tests
  const commandScreenshots = screenshotFiles.filter(file => !/failed/.test(file));
  const failedScreenshots = screenshotFiles.filter(file => /failed/.test(file));

  screenshotCommands.forEach((command, index) => {
    if (commandScreenshots[index]) {
      const screenshotName = path.basename(commandScreenshots[index]);
      command.message = `screenshot\t${screenshotName}`;
      console.log(screenshotName);
    }
  });

  failedCommands.forEach((command, index) => {
    if (failedScreenshots[index]) {
      const screenshotName = path.basename(failedScreenshots[index]);
      command.message = `screenshot\t${screenshotName}`;
      console.log(screenshotName);
    }
  });

  return logData;
}

// Read the JSON file
fs.readFile('./cypress/results/detailCommandLogs/detailCommandLogs.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  let logData;
  try {
    logData = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  // Read all screenshot filenames from the screenshots directory
  const screenshotsDir = './cypress/screenshots';
  const screenshotFiles = readAllFiles(screenshotsDir).filter(file => /\.(png|jpg|jpeg)$/.test(file));

  // Update the log data
  const updatedLogData = attachScreenshotNameInMessage(logData, screenshotFiles);

  // Write the updated JSON back to the file
  fs.writeFile('./cypress/results/detailCommandLogs/detailCommandLogs.json', JSON.stringify(updatedLogData, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing the file:', writeErr);
      return;
    }
    console.log('File successfully updated!');
  });
});

