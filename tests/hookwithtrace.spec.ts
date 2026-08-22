import { test, expect, Page} from '@playwright/test';

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.beforeEach(async () => {
  await page.goto('https://playwright.dev/');
});

test.afterEach(async () => {
  console.log('Test completed');
});

test('has title', async () => {

  // Expect a title "to contain" a substring.
  await expect(page).not.toHaveTitle(/Playwright/);
});

test('get started link', async () => {

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click({force:true});

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible({timeout: 5000});
});