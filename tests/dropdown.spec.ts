import { test, expect, Locator } from '@playwright/test'

test("Demo page - Dropdown", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const country = page.locator('#country option');

    const countries = await country.allInnerTexts();

    console.log(countries.map(country => country.trim()));

    const originallist: string[] = countries.map(country => country.trim());

    const sortedlist: string[] = originallist.sort();

    console.log("Sorted Array :" + sortedlist);

    // await page.locator('#country').selectOption('India');
    // await page.locator('#country').selectOption({value:'india'});
    await page.locator('#country').selectOption({ label: 'India' });

    const colors = page.locator('#colors option');

    console.log(await colors.allTextContents());

    const allcolors = await colors.allTextContents();

    const olist: string[] = allcolors.map(color => color.trim());

    console.log("original list:" + olist);

    const slist: string[] = [...new Set(olist)];

    console.log("Sorted list:" + slist);

    //single element check
    for (let option of olist) {
        if (option === 'Blue') {
            await page.locator('#colors').selectOption({ value: 'blue' });
        }
    }

    //multiple element check
    const multioption: string[] = ['Red', 'Blue', 'Yellow'];
    for (let option of olist) {
        for (let multi of multioption) {
            if (option === multi) {
                await page.locator('#colors').selectOption(multi);
                console.log("Selected:"+multi);
            }
        }
    }

    await page.waitForTimeout(5000);

});