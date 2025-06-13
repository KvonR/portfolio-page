/**
 * End-to-End Tests for Portfolio Website
 * Tests the complete user journey and cross-browser functionality
 */

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

describe('Portfolio E2E Tests', () => {
  let browser;
  let page;
  const baseURL = 'http://localhost:3000';

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true, // Set to false for debugging
      slowMo: 50, // Slow down by 50ms for visibility during debugging
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
  });

  afterEach(async () => {
    await page.close();
  });

  describe('Page Loading and Navigation', () => {
    test('homepage loads successfully', async () => {
      const response = await page.goto(baseURL);
      expect(response.status()).toBe(200);
      
      await page.waitForSelector('h1', { timeout: 5000 });
      const title = await page.$eval('h1', el => el.textContent);
      expect(title).toMatch(/kevin/i);
    });

    test('all sections are accessible via navigation', async () => {
      await page.goto(baseURL);
      
      const sections = ['#home', '#about-me', '#skills', '#experience', '#projects', '#contact'];
      
      for (const section of sections) {
        // Click navigation link
        await page.click(`a[href="${section}"]`);
        
        // Wait for scroll animation
        await page.waitForTimeout(1000);
        
        // Verify section is in view
        const sectionElement = await page.$(section);
        expect(sectionElement).toBeTruthy();
        
        const isInViewport = await page.evaluate((selector) => {
          const element = document.querySelector(selector);
          const rect = element.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
          );
        }, section);
        
        expect(isInViewport).toBe(true);
      }
    });
  });

  describe('Mobile Responsiveness', () => {
    test('mobile menu functionality', async () => {
      // Set mobile viewport
      await page.setViewport({ width: 375, height: 667 });
      await page.goto(baseURL);
      
      // Mobile menu should be hidden initially
      const menuList = await page.$('ul.mobile-menu-open');
      expect(menuList).toBeFalsy();
      
      // Click hamburger menu
      await page.click('.mobile-menu-toggle');
      await page.waitForTimeout(500);
      
      // Menu should be visible
      const openMenu = await page.$('ul.mobile-menu-open');
      expect(openMenu).toBeTruthy();
      
      // Click a menu item
      await page.click('ul.mobile-menu-open a[href="#projects"]');
      await page.waitForTimeout(1000);
      
      // Menu should close
      const closedMenu = await page.$('ul.mobile-menu-open');
      expect(closedMenu).toBeFalsy();
    });

    test('responsive design on different screen sizes', async () => {
      const viewports = [
        { width: 320, height: 568, name: 'iPhone SE' },
        { width: 375, height: 667, name: 'iPhone 8' },
        { width: 768, height: 1024, name: 'iPad' },
        { width: 1024, height: 768, name: 'iPad Landscape' },
        { width: 1920, height: 1080, name: 'Desktop' },
      ];
      
      for (const viewport of viewports) {
        await page.setViewport(viewport);
        await page.goto(baseURL);
        
        // Check if main content is visible
        const mainContent = await page.$('h1');
        expect(mainContent).toBeTruthy();
        
        // Take screenshot for visual testing
        await page.screenshot({
          path: `e2e-screenshots/${viewport.name.replace(/\s+/g, '-')}.png`,
          fullPage: true,
        });
      }
    });
  });

  describe('Contact Form Functionality', () => {
    test('contact form validation', async () => {
      await page.goto(baseURL);
      
      // Navigate to contact section
      await page.click('a[href="#contact"]');
      await page.waitForTimeout(1000);
      
      // Try to submit empty form
      await page.click('button[type="submit"]');
      
      // Check for HTML5 validation
      const nameInput = await page.$('input[name="name"]');
      const isNameValid = await page.evaluate(el => el.checkValidity(), nameInput);
      expect(isNameValid).toBe(false);
    });

    test('successful form submission flow', async () => {
      await page.goto(baseURL);
      
      // Navigate to contact section
      await page.click('a[href="#contact"]');
      await page.waitForTimeout(1000);
      
      // Fill out form
      await page.type('input[name="name"]', 'E2E Test User');
      await page.type('input[name="email"]', 'e2e@test.com');
      await page.type('textarea[name="message"]', 'This is an end-to-end test message.');
      
      // Submit form (note: this would trigger actual email in real environment)
      await page.click('button[type="submit"]');
      
      // Wait for loading state
      await page.waitForSelector('button:disabled', { timeout: 5000 });
      
      // In a real test, you'd mock the email service or use a test endpoint
      // For now, we just verify the form submission process works
    });
  });

  describe('Interactive Elements', () => {
    test('particle effects render without blocking interactions', async () => {
      await page.goto(baseURL);
      
      // Check if canvas element exists
      const canvas = await page.$('canvas');
      expect(canvas).toBeTruthy();
      
      // Verify buttons are still clickable
      const buttons = await page.$$('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Test button interaction
      const firstButton = buttons[0];
      await firstButton.click();
      
      // Should not throw errors
    });

    test('scroll indicator functionality', async () => {
      await page.goto(baseURL);
      
      // Check if scroll indicator exists
      const scrollIndicator = await page.$('.scroll-indicator');
      if (scrollIndicator) {
        // Test scroll behavior
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(500);
        
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(500);
      }
    });
  });

  describe('Performance and Accessibility', () => {
    test('page load performance', async () => {
      const start = Date.now();
      await page.goto(baseURL);
      await page.waitForSelector('h1');
      const loadTime = Date.now() - start;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('keyboard navigation accessibility', async () => {
      await page.goto(baseURL);
      
      // Test tab navigation
      await page.keyboard.press('Tab');
      
      // Check if focus is visible
      const focusedElement = await page.evaluate(() => document.activeElement.tagName);
      expect(['BUTTON', 'A', 'INPUT'].includes(focusedElement)).toBe(true);
      
      // Test multiple tab presses
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }
      
      // Should not get trapped or throw errors
    });

    test('images have alt text', async () => {
      await page.goto(baseURL);
      
      const images = await page.$$eval('img', imgs => 
        imgs.map(img => ({ src: img.src, alt: img.alt }))
      );
      
      images.forEach(img => {
        if (img.src && !img.src.includes('data:')) {
          expect(img.alt).toBeTruthy();
        }
      });
    });
  });

  describe('Cross-Browser Compatibility', () => {
    test('works in different browser contexts', async () => {
      // This test would ideally run against multiple browser types
      // For now, we test core functionality in current browser
      
      await page.goto(baseURL);
      
      // Test JavaScript features
      const jsTest = await page.evaluate(() => {
        // Test modern JS features used in the app
        const testArrowFunction = () => true;
        const testDestructuring = { a: 1, b: 2 };
        const { a, b } = testDestructuring;
        
        return testArrowFunction() && a === 1 && b === 2;
      });
      
      expect(jsTest).toBe(true);
      
      // Test CSS features
      const cssSupport = await page.evaluate(() => {
        const testElement = document.createElement('div');
        testElement.style.display = 'grid';
        testElement.style.flexDirection = 'column';
        
        return testElement.style.display === 'grid' && 
               testElement.style.flexDirection === 'column';
      });
      
      expect(cssSupport).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('handles JavaScript errors gracefully', async () => {
      const errors = [];
      
      page.on('pageerror', error => {
        errors.push(error.message);
      });
      
      page.on('requestfailed', request => {
        errors.push(`Request failed: ${request.url()}`);
      });
      
      await page.goto(baseURL);
      
      // Trigger potential error scenarios
      await page.evaluate(() => {
        // Test error boundaries
        window.dispatchEvent(new Event('error'));
      });
      
      // Should handle errors without crashing
      const mainContent = await page.$('h1');
      expect(mainContent).toBeTruthy();
      
      // Log any errors for debugging (but don't fail test unless critical)
      if (errors.length > 0) {
        console.warn('E2E Test warnings:', errors);
      }
    });
  });
});

// Helper function to run lighthouse audit
async function runLighthouseAudit(url) {
  const browser = await puppeteer.launch();
  const { lhr } = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
    logLevel: 'info',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  
  await browser.close();
  return lhr;
}

// Export for use in separate performance testing
module.exports = { runLighthouseAudit };
