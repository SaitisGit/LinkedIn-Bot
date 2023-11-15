// logger.js
const fs = require('fs');
const config = require('./config');

const logger = {
    info: (message) => {
        const logMessage = `[INFO] ${getCurrentTimestamp()} - ${message}`;
        writeToLogFile(logMessage);
        if (config.get('logToConsole')) {
            console.log(logMessage);
        }
    },
    error: (message) => {
        const errorMessage = `[ERROR] ${getCurrentTimestamp()} - ${message}`;
        writeToLogFile(errorMessage);
        if (config.get('logToConsole')) {
            console.error(errorMessage);
        }
    },
};

function getCurrentTimestamp() {
    return new Date().toISOString();
}

function writeToLogFile(message) {
    const logFilePath = config.get('logFilePath');
    try {
        fs.appendFileSync(logFilePath, `${message}\n`);
    } catch (error) {
        console.error(`Error writing to log file: ${error.message}`);
    }
}

module.exports = logger;
