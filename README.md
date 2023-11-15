# LinkedIn Bot

## Overview

This script is a simple LinkedIn bot that automates liking posts in your LinkedIn feed. It uses Puppeteer, a headless browser automation library for Node.js, to interact with the LinkedIn website.

## Prerequisites

Before running the script, ensure you have the following installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm (Node Package Manager): Installed with Node.js

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/your-username/linkedin-bot.git
    cd linkedin-bot
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Open the `config.js` file and adjust the configuration settings as needed.

    ```javascript
    // config.js
    module.exports = {
        get: (key) => {
            // Add your configuration settings here
            return YOUR_CONFIG_VALUE;
        },
    };
    ```

2. Open the `linkedinbot.js` file and set your LinkedIn credentials.

    ```javascript
    // linkedinbot.js
    const username = 'your_email@example.com';
    const password = 'your_password';
    ```

## Usage

Run the bot using the following command:

```bash
node index.js
