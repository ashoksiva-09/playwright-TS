import { test, expect, Locator } from '@playwright/test'

test("Webtable test", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("//table[@name='BookTable']/tbody");

    const row: Locator = table.locator('tr');

    console.log("Total No. of rows:" + await row.count());

    const td: Locator = row.locator('td');

    console.log("Total No. of td:" + await td.count());

    //print all table data
    for (let i = 1; i <= await row.count() - 1; i++) {

        console.log("Data:" + await row.nth(i).allInnerTexts());
    }

    //print price in table and adding all price
    let totalprice = 0;
    for (let i = 1; i <= await row.count() - 1; i++) {
        const cells: string[] = await row.nth(i).locator('td').allInnerTexts();
        const price: string = cells[3];

        console.log("Price: " + price);
        totalprice = totalprice + parseInt(price);
    }
    console.log("Total Price:" + totalprice);


    console.log("--------------DYNAMIC WEBTABLE-----------------------");

    const dwt = await page.locator("//table[@id='taskTable']/tbody");

    // const chromes:string[] = await dwt.locator('tr',{hasText:'Chrome'}).allTextContents();

    const chromes = await dwt.locator('tr', { hasText: 'Chrome' });

    const cpuload = await chromes.locator('td', { hasText: '%' }).textContent();

    console.log(await chromes.allTextContents());

    console.log("CPU load of Chrome process: " + cpuload);

    const firefoxs = await dwt.locator('tr', { hasText: 'Firefox' });

    const msize = await firefoxs.locator('td', { hasText: /MB$/ }).textContent();

    console.log(await firefoxs.allTextContents());

    console.log("Memory Size of Firefox process: " + msize);

    const networkspeed = await chromes.locator('td', { hasText: /Mbps$/ }).textContent();

    const dikspace = await firefoxs.locator('td', { hasText: /MB\/s$/ }).textContent();

    console.log("Network speed of Chrome process:" + networkspeed);

    console.log("Disk space of Firefox process:" + dikspace);

    await page.waitForTimeout(5000);
})

// test.only("Pagination Web Table", async ({ page }) => {
test("Pagination Web Table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = page.locator("//table[@id='productTable']/tbody");

    const row = await table.locator('tr');

    const rowsize: number = await row.count();

    console.log("Row Size:" + rowsize);

    const pagination: string[] = await page.locator("#pagination li").allTextContents();

    console.log("No. of Pages: " + await pagination.length);

    const namearray:Set<String> = new Set<String>;

    for (let i = 0; i < pagination.length; i++) {
        await page.locator("#pagination li").nth(i).click();

        for (let j = 0; j < rowsize; j++) {
            const checkb = await row.nth(j).locator('td').nth(3);
            const name:string = await row.nth(j).locator('td').nth(1).innerText();
            await namearray.add(name);
            await checkb.locator('//input[@type="checkbox"]').check();
        }

    }

    console.log([...namearray].sort());

    // await page.waitForTimeout(5000);
})