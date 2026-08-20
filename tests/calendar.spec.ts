import { test, expect } from '@playwright/test'

test("Calendar test1", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    console.log("----------------------DATEPICKER1----------------------");

    await page.locator("#datepicker").fill("06/06/2024");

    await page.locator("#datepicker").clear();

    const future = await page.locator("//a[@class='ui-datepicker-next ui-corner-all']");
    const past = page.locator("//a[@class='ui-datepicker-prev ui-corner-all']");
    const months = await page.locator("//span[@class='ui-datepicker-month']");

    const year: number = 2025;
    const month = "June";
    const date = 6;

    const currentyear: number = new Date().getFullYear();

    while (true) {

        if (year < currentyear) {
            await past.click();

            if (await months.textContent() == month && await page.locator("//span[@class='ui-datepicker-year']").textContent() == year.toString()) {
                break;
            }

        } else if (year > currentyear) {
            await future.click();

            if (await months.textContent() == month && await page.locator("//span[@class='ui-datepicker-year']").textContent() == year.toString()) {
                break;
            }
        }

    }

    await page.locator("//*[@data-date='"+date+"']").click();

    await page.waitForTimeout(5000);
});


test.only("Calendar test2", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("//*[@id='txtDate']").click();

    const month = await page.locator("//*[@class='ui-datepicker-month']");

    const year = await page.locator("//*[@class='ui-datepicker-year']");

    const date = 6;

    month.selectOption({ label: "Jun" });
    year.selectOption({ label: "2024" });
    await page.locator("//*[@data-date='"+date+"']").click();

    await page.waitForTimeout(5000);

})