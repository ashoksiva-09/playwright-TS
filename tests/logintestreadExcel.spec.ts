import { test, expect } from '@playwright/test'
import { Loginpage } from '../pages/Loginpage'
import { readExcel } from '../utils/readexcel';

const logindata = readExcel('./testdata/loginexceldatas.xlsx', 'loginexceldata')

logindata.forEach(data => {


    if (data.run === "yes") {

        test(`Login Page validates - ${data.username}`, async ({ page }) => {

            const login = new Loginpage(page);

            await test.step('Navigate to URL', async () => {
                await login.gotoURL();
            })

            await test.step('Enter Username and Password', async () => {
                await login.login(data.username, data.password);
            })

            await test.step('Login Validation', async () => {
                if (data.validation === "error") {
                    await expect(login.error).toBeVisible();
                } else {
                    await page.waitForURL("https://www.saucedemo.com/inventory.html");
                }
            })

        })
    }

});