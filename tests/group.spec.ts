import { test, expect } from '@playwright/test';

test.describe('Group Hook', () => {

    test.beforeAll(async () => {
        console.log('Before All Hook');
        
    });

    test.afterAll(async () => {
        console.log('After All Hook');
    });

    test.beforeEach(async ({ page }) => {
        console.log('Before Each Hook');
        await page.goto("https://sauce-demo.myshopify.com/");
        await expect(page).toHaveTitle(/demo/i);
    }  );

    test.afterEach(async () => {
        console.log('After Each Hook');
    });



    test('Navigate to URL and check the title', { tag: '@smoke' }, async ({ page }) => {
        test.slow();

        await page.getByRole('link', { name: 'Log In' }).click();
        await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();


        await page.getByLabel('Email Address').fill('test@yopmail.com');
        await page.getByLabel('Password').fill('Password');

        await page.getByRole('button', { name: 'Sign In' }).click();
    });

    test.fail('Invalid Login Valiation', { tag: '@regression' }, async ({ page }) => {

        await page.getByRole('link', { name: 'Log In' }).click();
        await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();


        await page.getByLabel('Email Address').fill('asd@asd.com');
        await page.getByLabel('Password').fill('Password');

        await expect(page.getByTestId('authorize-modal-close-button')).toBeVisible({ timeout: 10000 });
        await page.getByTestId('authorize-modal-close-button').click();

        await page.getByRole('button', { name: 'Sign In' }).click();

        await expect(page.getByRole('list', { name: 'Incorrect email or password.' })).toBeVisible();

        await page.pause();
    });

    test.skip('Navigate to URL & check the title', { tag: ['@smoke', '@regression'] }, async ({ page }) => {

        await page.getByRole('link', { name: 'Log In' }).click();
        await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();


        await page.getByLabel('Email Address').fill('test@yopmail.com');
        await page.getByLabel('Password').fill('Password');

        await page.getByRole('button', { name: 'Sign In' }).click();
    });

    test.fixme('Invalid Login detail Valiation',{tag:'@smoke'}, async ({ page }) => {

        await page.getByRole('link', { name: 'Log In' }).click();
        await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();


        await page.getByLabel('Email Address').fill('asd@asd.com');
        await page.getByLabel('Password').fill('Password');

        await expect(page.getByTestId('authorize-modal-close-button')).toBeVisible({ timeout: 10000 });
        await page.getByTestId('authorize-modal-close-button').click();

        await page.getByRole('button', { name: 'Sign In' }).click();

        await expect(page.getByRole('list', { name: 'Incorrect email or password.' })).toBeVisible();

        await page.pause();
    });

});