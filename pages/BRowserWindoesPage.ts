
import { Page, BrowserContext } from "@playwright/test";
import { BrowserWindowsConstants } from "../Test-data/Constants";
export class BrowserWindowsPage {
 readonly page: Page;
 readonly context: BrowserContext;
 // ─── Locators 
 private readonly newTabBtn = '[id="tabButton"]';
 private readonly newWindowBtn = '[id="windowButton"]';
 private readonly newWindowMsgBtn = '[id="messageWindowButton"]';
 private readonly sampleHeading = '[id="sampleHeading"]';
 private readonly messageWindowBody = "body";
 constructor(page: Page, context: BrowserContext) {
 this.page = page;
 this.context = context;
 }
 // ─── Navigation 

 async goto(): Promise<void> {
 await this.page.goto(BrowserWindowsConstants.URL);
 }
 // ─── Actions 
 async clickNewTab(): Promise<Page> {
 const [newPage] = await Promise.all([
 this.context.waitForEvent("page"),
 this.page.click(this.newTabBtn),
 ]);
 await newPage.waitForLoadState("domcontentloaded");
 return newPage;
 }
 async clickNewWindow(): Promise<Page> {
 const [newPage] = await Promise.all([
 this.context.waitForEvent("page"),
 this.page.click(this.newWindowBtn),
 ]);
 await newPage.waitForLoadState("domcontentloaded");
 return newPage;
 }
 async clickNewWindowMessage(): Promise<Page> {
 const [newPage] = await Promise.all([
 this.context.waitForEvent("page"),
 this.page.click(this.newWindowMsgBtn),
 ]);
 await newPage.waitForLoadState("domcontentloaded");
 return newPage;
 }
 async closeChildPage(childPage: Page): Promise<void> {
 await childPage.close();
 }
 // ─── Getters 
 getOpenPageCount(): number {
 return this.context.pages().length;
 }
 getCurrentUrl(): string {
 return this.page.url();
 }
 async getChildPageHeadingText(childPage: Page): Promise<string> {
 return childPage.locator(this.sampleHeading).innerText();
 }
 async getMessageWindowBodyText(childPage: Page): Promise<string> {
 return childPage.locator(this.messageWindowBody).innerText();
 }
 // ─── Assertions 
 async verifyPageIsVisible(): Promise<void> {
 await this.page.waitForSelector(this.newTabBtn, { state: "visible" 
});
 }
 async verifyChildTabHeading(childPage: Page): Promise<void> {
 const text = await this.getChildPageHeadingText(childPage);
 const { expect } = await import("@playwright/test");
 expect(text).toBe(BrowserWindowsConstants.SAMPLE_PAGE_HEADING);
 }
 async verifyMessageWindowText(childPage: Page): Promise<void> {
 const text = await this.getMessageWindowBodyText(childPage);
 const { expect } = await import("@playwright/test");
 expect(text).toContain(BrowserWindowsConstants.MESSAGE_WINDOW_TEXT);
 }
 async verifyTabCountIs(expected: number): Promise<void> {
 const { expect } = await import("@playwright/test");
 expect(this.getOpenPageCount()).toBe(expected);
 }
 async verifyParentUrlIsActive(): Promise<void> {
 const { expect } = await import("@playwright/test");
 
expect(this.getCurrentUrl()).toContain(BrowserWindowsConstants.PARENT_URL_FRAGMENT);
 }
}
