// const fs = require('fs');
// const path = require('path');
// const jsonpath = require('jsonpath');

// const screenshotsDir = './cypress/screenshots';
// const outputFilePath = './cypress/screenshots/screenshots_base64.json';
// const detailCommandLogsPath = './cypress/results/detailCommandLogs/detailCommandLogs.json';

// const convertScreenshotsToBase64 = (dir) => {
//     const items = fs.readdirSync(dir);
//     const base64Screenshots = {};

//     items.forEach(item => {
//         const itemPath = path.join(dir, item);
//         if (fs.lstatSync(itemPath).isDirectory()) {
//             // Recursively process subdirectories
//             Object.assign(base64Screenshots, convertScreenshotsToBase64(itemPath));
//         } else if (fs.lstatSync(itemPath).isFile() && path.extname(item) === '.png') {
//             const fileData = fs.readFileSync(itemPath, { encoding: 'base64' });
//             base64Screenshots[item] = fileData; // Use the filename as the key
//         }
//     });

//     return base64Screenshots;
// };

// const base64Screenshots = convertScreenshotsToBase64(screenshotsDir);
// fs.writeFileSync(outputFilePath, JSON.stringify(base64Screenshots, null, 2));

// console.log("Screenshots converted to base64 and saved to", outputFilePath);

// // Read existing data from detailCommandLogs.json
// let detailCommandLogs = {};
// if (fs.existsSync(detailCommandLogsPath)) {
//     const rawData = fs.readFileSync(detailCommandLogsPath);
//     detailCommandLogs = JSON.parse(rawData);
// }

// // Function to add base64 data to the logs using JSONPath
// const addBase64ToLogs = (logs, base64Screenshots) => {
//     const screenshotPaths = jsonpath.paths(logs, '$..[?(@.message && @.message.includes("screenshot"))]');
//     screenshotPaths.forEach(path => {
//         const log = jsonpath.value(logs, path); // Ensure log is defined here
//         if (log && log.message) { // Check if log and log.message exist
//             const screenshotName = log.message.split('\t')[1];
//             if (base64Screenshots[screenshotName]) {
//                 log.base64 = base64Screenshots[screenshotName];
//             }
//         }
//     });
// };

// // Add the base64 data to the corresponding entries in detailCommandLogs
// addBase64ToLogs(detailCommandLogs, base64Screenshots);

// // Write the updated data back to detailCommandLogs.json
// fs.writeFileSync(detailCommandLogsPath, JSON.stringify(detailCommandLogs, null, 2));

// console.log("Base64 data added to", detailCommandLogsPath);


const fs = require('fs');
const path = require('path');

const screenshotsDir = './cypress/screenshots';
const outputFilePath = './cypress/screenshots/screenshots_base64.json';
const detailCommandLogsPath = './cypress/results/detailCommandLogs/detailCommandLogs.json';

const convertScreenshotsToBase64 = (dir) => {
    const items = fs.readdirSync(dir);
    const base64Screenshots = {};

    items.forEach(item => {
        const itemPath = path.join(dir, item);
        if (fs.lstatSync(itemPath).isDirectory()) {
            // Recursively process subdirectories
            Object.assign(base64Screenshots, convertScreenshotsToBase64(itemPath));
        } else if (fs.lstatSync(itemPath).isFile() && path.extname(item) === '.png') {
            const fileData = fs.readFileSync(itemPath, { encoding: 'base64' });
            base64Screenshots[item] = fileData; // Use the filename as the key
        }
    });

    return base64Screenshots;
};

const base64Screenshots = convertScreenshotsToBase64(screenshotsDir);
fs.writeFileSync(outputFilePath, JSON.stringify(base64Screenshots, null, 2));

console.log("Screenshots converted to base64 and saved to", outputFilePath);

// Read existing data from detailCommandLogs.json
let detailCommandLogs = {};
if (fs.existsSync(detailCommandLogsPath)) {
    try {
        const rawData = fs.readFileSync(detailCommandLogsPath, 'utf-8');
        detailCommandLogs = JSON.parse(rawData);
    } catch (error) {
        console.error("Error reading or parsing detailCommandLogs.json:", error);
    }
} else {
    console.error("detailCommandLogs.json file does not exist.");
}

// Function to add base64 data to the logs
const addBase64ToLogs = (logs, base64Screenshots) => {
    for (const testCase in logs) {
        for (const testName in logs[testCase]) {
            logs[testCase][testName].forEach(logEntry => {
                if (logEntry.message && logEntry.message.includes('screenshot')) {
                    const screenshotName = logEntry.message.split('\t')[1];
                    if (base64Screenshots[screenshotName]) {
                        logEntry.base64 = base64Screenshots[screenshotName];
                    }
                }
            });
        }
    }
};

// Add the base64 data to the corresponding entries in detailCommandLogs
addBase64ToLogs(detailCommandLogs, base64Screenshots);

// Write the updated data back to detailCommandLogs.json
try {
    fs.writeFileSync(detailCommandLogsPath, JSON.stringify(detailCommandLogs, null, 2));
    console.log("Base64 data added to", detailCommandLogsPath);
} catch (error) {
    console.error("Error writing to detailCommandLogs.json:", error);
}





