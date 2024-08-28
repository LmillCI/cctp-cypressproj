const fs = require('fs');
const path = require('path');

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

    // Print filtered screenshots along with their timestamps
    filteredScreenshots.forEach(screenshot => {
        console.log(`Screenshot name: ${screenshot.name}, Timestamp: ${screenshot.time}`);
    });
}

// Example usage
 const jsonTimestamp = "2023-08-27T00:00:00Z"; // Replace with your JSON timestamp
filterScreenshots(jsonTimestamp);
