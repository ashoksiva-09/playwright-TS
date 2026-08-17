import {Page,Locator} from '@playwright/test'

export class Loginpage{

    readonly page:Page;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginbtn:Locator;
    readonly error:Locator;

    constructor(page:Page){
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginbtn = page.locator('#login-button');
        this.error = page.locator('[data-test=error]');
    }

    async gotoURL(){
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(username:string,password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginbtn.click();
    }
}