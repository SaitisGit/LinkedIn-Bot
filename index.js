// index.js
const puppeteer = require('puppeteer');
const mainScript = require('./linkedinbot');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Replace 'https://www.linkedin.com/feed/' with the LinkedIn home page URL
    await page.goto('https://www.linkedin.com/');

    // Run the main script on the LinkedIn home page
    await mainScript(page);

    await browser.close();
})();
