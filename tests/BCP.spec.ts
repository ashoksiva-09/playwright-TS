import { test,expect,chromium } from "@playwright/test";

test("BCP test", async () => {
    const browser = await chromium.launch({ headless: false});
    const context = await browser.newContext();
    const page = await context.newPage(); 

    const newpagepromise = context.waitForEvent('page');

    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.getByRole("button", { name: "New Tab" }).click();

    const newpage = await newpagepromise;

    await newpage.waitForLoadState();

    const pages = context.pages();

    console.log("Total pages: " + pages.length);

    pages[0].bringToFront();

    await pages[0].waitForTimeout(5000);

    pages[1].bringToFront();

    await expect(pages[0].url()).toBe("https://testautomationpractice.blogspot.com/");

    expect(pages[0].title()).resolves.toContain("Automation Testing");

    await pages[1].waitForTimeout(5000);

    await expect(pages[1].url()).toBe("https://www.pavantestingtools.com/");

    await expect(pages[1].title()).resolves.toContain("SDET");

    await pages[1].close();

    await pages[0].bringToFront();

    await pages[0].on("dialog", async (dialog) => {
        console.log(dialog.message());
        await dialog.accept();
    });

    await pages[0].locator("#alertBtn").click();
});