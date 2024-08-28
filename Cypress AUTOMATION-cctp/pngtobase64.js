const fs = require('fs');
const path = require('path');

const screenshotsDir = './cypress/screenshots';
const outputFilePath = './cypress/screenshots/screenshots_base64.json';

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
            base64Screenshots[itemPath] = fileData;
        }
    });

    return base64Screenshots;
};

const base64Screenshots = convertScreenshotsToBase64(screenshotsDir);
fs.writeFileSync(outputFilePath, JSON.stringify(base64Screenshots, null, 2));

console.log("Screenshots converted to base64 and saved to", outputFilePath);
