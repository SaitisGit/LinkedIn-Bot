// config.js
const config = {
    get: (key) => {
        // Your implementation to get configuration values
        // Replace the following lines with your actual implementation

        // Example: Set to true to log to the console
        if (key === 'logToConsole') {
            return true;
        }

        // Example: Set the log file path
        if (key === 'logFilePath') {
            return 'app.log';
        }

        // Example: Set the LinkedIn URL
        if (key === 'url') {
            return 'https://www.linkedin.com';
        }

        // Example: Set the sleep duration
        if (key === 'sleep') {
            return 1000;
        }
    },
};

module.exports = config;
