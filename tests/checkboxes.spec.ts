import { test, expect, Locator } from '@playwright/test'

test("Demo page", async ({ page }) => {

    // //Set viewport zise.
    // const context = await browser.newContext({
    //     viewport: { width: 1820, height: 1080 }
    // });

    // //Launch browser maximised.
    // const page = await context.newPage();

    await page.goto("https://testautomationpractice.blogspot.com/");

    //placeholde Build in locators
    await page.getByPlaceholder("Enter Name").fill("Test");

    //css locator
    await page.locator("#email").fill("test@test.com");

    //css locator
    await page.locator("#phone").fill("9876543211");

    //Label
    await page.getByLabel("Address:").fill("Abc defe cnaj cajhsdn asnasdn");

    //xpath
    await page.locator("//input[@id='male']").check();
    expect(await page.locator("//input[@id='male']")).toBeChecked();

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const alldays: Locator[] = days.map(index => page.getByLabel(index));
    console.log(alldays.length);

    //check all check boxes
    for (const check of alldays) {
        await check.check();
        await expect(check).toBeChecked();
    }

    //uncheck last 3 check boxes
    for (const check of alldays.slice(-3)) {
        await check.uncheck();
        await expect(check).not.toBeChecked();
    }

    //check the unchecked and viceversa
    for (const check of alldays) {
        if (await check.isChecked()) {
            await check.uncheck();
            await expect(check).not.toBeChecked();
        } else {
            await check.check();
            await expect(check).toBeChecked();
        }
    }

    //check exact match
    const oneselect: string = 'Monday';

    for (const check of days) {
        if (check === oneselect) {
            await page.getByLabel(check).check();
        }
    }

    //check any 2 check box
    const multicheck:string[] = ['Sunday','Tuesday'];

    for (const check of days) {
        for(const check1 of multicheck){
        if (check === check1) {
            await page.getByLabel(check1).check();
        }
    }
    }



    await page.waitForTimeout(5000);
});