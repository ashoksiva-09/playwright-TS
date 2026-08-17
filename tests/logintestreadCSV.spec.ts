import { test, expect } from '@playwright/test'
import { Loginpage } from '../pages/Loginpage'
import {csvReader} from '../utils/readcsv.ts'

const logindata = csvReader('./testdata/csvlogindata.csv')

logindata.forEach((data:any) => {

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