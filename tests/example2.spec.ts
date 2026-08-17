import{test,expect} from '@playwright/test';

test('Navigate to URL and check the title', async ({page}) =>{
    await page.goto("https://sauce-demo.myshopify.com/");
    await expect(page).toHaveTitle(/demo/i);

    await page.getByRole('link',{name:'Log In'}).click();
    await expect(page.getByRole('heading',{name:'Customer Login'})).toBeVisible();

    
    await page.getByLabel('Email Address').fill('test@yopmail.com');
    await page.getByLabel('Password').fill('Password');

    await page.getByRole('button',{name:'Sign In'}).click();
});

test('Invalid Login Valiation', async ({page}) =>{
    await page.goto('https://sauce-demo.myshopify.com/account/login');
    
    await page.getByRole('link',{name:'Log In'}).click();
    await expect(page.getByRole('heading',{name:'Customer Login'})).toBeVisible();

    
    await page.getByLabel('Email Address').fill('asd@asd.com');
    await page.getByLabel('Password').fill('Password');

    await expect(page.getByTestId('authorize-modal-close-button')).toBeVisible({timeout:10000});
    await page.getByTestId('authorize-modal-close-button').click();

    await page.getByRole('button',{name:'Sign In'}).click();

    await expect(page.getByRole('list',{name:'Incorrect email or password.'})).toBeVisible();

    await page.pause();
});
