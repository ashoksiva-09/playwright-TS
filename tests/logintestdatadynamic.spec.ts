import { test, expect } from '@playwright/test'
import { Loginpage } from '../pages/Loginpage'
import dynamiclogintestdata from '../testdata/dynamiclogintestdata.json'

dynamiclogintestdata.forEach(data => {

    if (data.run === "true") {

        test(`Login Page validates - ${data.username}`, async ({ page }) => {

            const login = new Loginpage(page);

            await login.gotoURL();
            await login.login(data.username, data.password);

            if (data.validation === "error") {
                await expect(login.error).toBeVisible();
            } else {
                await page.waitForURL("https://www.saucedemo.com/inventory.html");
            }

        })
    }

});