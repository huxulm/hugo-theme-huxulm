// playwright-screenshot.js
// const { chromium } = require('playwright');
import * as playwright from 'playwright';
const { chromium } = playwright;

async function generateImage() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    await page.setViewportSize({ width: 1200, height: 630 });
    
    await page.goto(`file://../${__dirname}/etcd-cover-generator.html`);
    
    await page.screenshot({
        path: 'etcd-cover-playwright.png',
        type: 'png'
    });
    
    await browser.close();
}

generateImage();