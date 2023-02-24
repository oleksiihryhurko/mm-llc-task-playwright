import { Page } from "@playwright/test";

export abstract class BasePage {
    protected abstract path: string;

    constructor(protected page: Page) { }

    async goto() { 
        return this.page.goto(this.path);
    }
}