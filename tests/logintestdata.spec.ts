import {test,expect} from '@playwright/test'
import { Loginpage } from '../pages/Loginpage'
import logintestdata from '../testdata/logintestdata.json'

test("Valid credentials- Login Page", async ({page}) => {

    const login = new Loginpage(page);

    await login.gotoURL();
    await login.login(logintestdata.valid_data.username,logintestdata.valid_data.password);
    await page.waitForURL("https://www.saucedemo.com/inventory.html");
    
})

test("Invalid credentials- Login Page", async ({page}) => {

    const login = new Loginpage(page);

    await login.gotoURL();
    await login.login(logintestdata.invalid_data.username,logintestdata.invalid_data.password);
    await expect(login.error).toBeVisible();
})