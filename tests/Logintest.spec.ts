import {test,expect} from '@playwright/test'
import { Loginpage } from '../pages/Loginpage'

test("Valid credentials- Login Page", async ({page}) => {

    const login = new Loginpage(page);

    await login.gotoURL();
    await login.login('standard_user','secret_sauce');
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    
})

test("Invalid credentials- Login Page", async ({page}) => {

    const login = new Loginpage(page);

    await login.gotoURL();
    await login.login('locked_out_user','secret_sauce');
    await expect(login.error).toBeVisible();
    
})