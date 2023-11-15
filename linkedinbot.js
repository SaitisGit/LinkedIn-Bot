// linkedinbot.js
const puppeteer = require('puppeteer');
const config = require('./config');
const logger = require('./logger');
const { sanitize } = require('./util');

async function loginToLinkedIn(page) {
    try {
        logger.info('Navigating to the login page...');

        const loginUrl = 'https://www.linkedin.com/login?fromSignIn=true';
        await page.goto(loginUrl);

        logger.info('Logging in to LinkedIn...');

        const username = 'test@test.com'; // your login username or email
        const password = '123456'; // your login password

        await page.type('input[name="session_key"]', username);
        await page.type('input[name="session_password"]', password);

        await Promise.all([
            page.waitForNavigation(),
            page.click('button[data-litms-control-urn="login-submit"]'),
        ]);

        logger.info('Logged in successfully!');
    } catch (error) {
        logger.error('Error during login:', error);
        throw error; // Propagate the error to stop the script if login fails
    }
}

async function checkAndLikePost(article) {
    try {
        const likeButton = await article.$('button[data-finite-scroll-hotkey="l"]');

        if (likeButton) {
            const liked = await likeButton.evaluate(node => node.getAttribute('aria-pressed') === 'true');
            if (!liked) {
                await likeButton.click({ delay: 20 });
                logger.info('Liked a post.');
            }
        }
    } catch (error) {
        logger.error('Error while liking a post:', error);
    }
}

async function getUnlikedPosts(page) {
    const articles = await page.$$('.feed-shared-update-v2');
    const unlikedPosts = [];

    for (const article of articles) {
        const likeButton = await article.$('button[data-finite-scroll-hotkey="l"]');
        if (likeButton) {
            const liked = await likeButton.evaluate(node => node.getAttribute('aria-pressed') === 'true');
            if (!liked) {
                unlikedPosts.push(article);
            }
        }
    }

    return unlikedPosts;
}

async function likeRandomPosts(page) {
    const minLikes = 2;
    const maxLikes = 5;
    const count = Math.floor(Math.random() * (maxLikes - minLikes + 1)) + minLikes;

    const unlikedPosts = await getUnlikedPosts(page);

    // Shuffle the unliked posts array randomly
    const shuffledUnlikedPosts = unlikedPosts.sort(() => Math.random() - 0.5);

    // Like the random number of posts between 2 and 5 with random delays
    for (const post of shuffledUnlikedPosts.slice(0, Math.min(count, shuffledUnlikedPosts.length))) {
        await checkAndLikePost(post);
        const likeDelay = Math.floor(Math.random() * (30 * 1000 - 10 * 1000 + 1)) + 10 * 1000;
        await page.waitForTimeout(likeDelay);
    }
}

async function runBot() {
    try {
        const browser = await puppeteer.launch({ headless: false }); // Set headless to true for headless mode
        const page = await browser.newPage();

        // Log in to LinkedIn
        await loginToLinkedIn(page);

        while (true) {
            // Like random posts between 2 to 5
            await likeRandomPosts(page);

            // Wait for a random time between 1 and 3 hours
            const randomWaitTime = Math.floor(Math.random() * (3 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000 + 1)) + 1 * 60 * 60 * 1000;
            await page.waitForTimeout(randomWaitTime);

            // Refresh the page
            await page.reload({ waitUntil: 'domcontentloaded' });

            // Scroll to the top
            await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
            await page.waitForTimeout(config.get('sleep')); // Adjust sleep duration as needed
        }
    } catch (error) {
        logger.error('Error in the main script:', error);
        process.exit(1); // Exit the script with an error code
    }
}

module.exports = runBot;
