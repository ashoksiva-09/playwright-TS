import {test,expect} from '@playwright/test'

test("Simple Alert test",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.on("dialog",async(dialog)=>{
        console.log(dialog.message());
        await dialog.accept();
    });

    await page.locator("#alertBtn").click();

    
})

test("Confirmation Alert test",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.on("dialog",async(dialog)=>{
        console.log(dialog.message());
        await dialog.accept();
        // await dialog.dismiss();
    });

    await page.locator("#confirmBtn").click();

    await expect(page.locator("#demo")).toContainText("You pressed OK!");
})

test("Prompt Alert test",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.on("dialog",async(dialog)=>{
        console.log(dialog.message());
        await dialog.accept("Ashok");
    });

    await page.locator("#promptBtn").click();

    await expect(page.locator("#demo")).toContainText("Hello");
})

test("Drag & Drop test",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#draggable").dragTo(page.locator("#droppable"));

    await page.waitForTimeout(5000);
})