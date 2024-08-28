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

// Function to filter screenshots based on timestamp
function filterScreenshots(jsonTimestamp) {
  const screenshotsDir = path.join("./cypress/screenshots");
  let screenshots = [];

  function readDirectory(directory) {
    try {
      const files = fs.readdirSync(directory);
      files.forEach(file => {
        const filePath = path.join(directory, file);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isDirectory()) {
          readDirectory(filePath); // Recursively read subdirectories
        } else if (file.endsWith('.png')) {
          screenshots.push({
            name: file,
            time: fileStat.mtime
          });
        }
      });
    } catch (err) {
      console.error('Error reading directory:', err);
    }
  }

  readDirectory(screenshotsDir);

  // Filter screenshots based on the timestamp
  const filteredScreenshots = screenshots.filter(screenshot => {
    return new Date(screenshot.time) >= new Date(jsonTimestamp);
  });

  return filteredScreenshots.map(screenshot => screenshot.name);
}

// Function to attach screenshot name in the message
function attachScreenshotNameInMessage(logData, screenshotFiles) {
  const screenshotCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.message=="screenshot\t")]');
  const failedCommands = jsonpath.query(logData, '$..[?(@.type=="cy:command" && @.severity=="error")]');

  // Filter screenshots for explicit commands and failed tests
  const commandScreenshots = screenshotFiles.filter(file => !/failed/.test(file));
  const failedScreenshots = screenshotFiles.filter(file => /failed/.test(file));

  screenshotCommands.forEach((command, index) => {
    if (commandScreenshots[index]) {
      const screenshotName = path.basename(commandScreenshots[index]);
      const screenshotTime = new Date(parseInt(command.timeString, 10)); // Extract timestamp from JSON log data
      if (!isNaN(screenshotTime)) {
        command.message = `screenshot\t${screenshotName}`;
        console.log(`[${screenshotTime.toISOString()}] Command screenshot: ${screenshotName}`);
      } else {
        console.log(`Invalid timestamp for command screenshot: ${screenshotName}`);
      }
    }
  });

  failedCommands.forEach((command, index) => {
    if (failedScreenshots[index]) {
      const screenshotName = path.basename(failedScreenshots[index]);
      const screenshotTime = new Date(parseInt(command.timeString, 10)); // Extract timestamp from JSON log data
      if (!isNaN(screenshotTime)) {
        command.message = `screenshot\t${screenshotName}`;
        console.log(`[${screenshotTime.toISOString()}] Failed screenshot: ${screenshotName}`);
      } else {
        console.log(`Invalid timestamp for failed screenshot: ${screenshotName}`);
      }
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
    console.log(`[${new Date().toISOString()}] JSON file successfully parsed.`);
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    return;
  }

  // Example usage
  const jsonTimestamp = "2023-08-27T00:00:00Z"; // Replace with your JSON timestamp
  const filteredScreenshotFiles = filterScreenshots(jsonTimestamp);

  // Update the log data
  const updatedLogData = attachScreenshotNameInMessage(logData, filteredScreenshotFiles);

  // Write the updated JSON back to the file
  fs.writeFile('./cypress/results/detailCommandLogs/detailCommandLogs.json', JSON.stringify(updatedLogData, null, 2), 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing the file:', writeErr);
      return;
    }
    console.log('File successfully updated!');
  });
});
