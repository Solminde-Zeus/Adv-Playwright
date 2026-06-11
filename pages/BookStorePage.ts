
import { Page } from "@playwright/test";
import { BooksApiResponse } from "../Test-data/books";
import { BookStoreConstants } from "../Test-data/Constants";
export class BookStorePage {
 readonly page: Page;
 // ─── Locators 
 private readonly bookList = '[class="rt-tbody"]';
 private readonly bookTitle = '[id^="see-book"]';
 private readonly noRowsText = ".rt-noData";
 private readonly spinner = ".loading-wrapper";
 constructor(page: Page) {
 this.page = page;
 }
 // ─── Navigation 
 async goto(): Promise<void> {
 await this.page.goto(BookStoreConstants.URL);
 }
 // ─── Network Mocking — all route logic lives here, not in spec 
 async mockBooksApi(response: BooksApiResponse): Promise<void> {
 await this.page.route(BookStoreConstants.API_PATTERN, async (route) => {
 await route.fulfill({
 status: 200,
 contentType: "application/json",
 body: JSON.stringify(response),
 });
 });
 }
 async mockBooksApiWithDelay(response: BooksApiResponse): Promise<void> 
{
 await this.page.route(BookStoreConstants.API_PATTERN, async (route) => {
 await new Promise((resolve) =>
    setTimeout(resolve, BookStoreConstants.DELAY_MS)
 );
 await route.fulfill({
 status: 200,
 contentType: "application/json",
 body: JSON.stringify(response),
 });
 });
 }

 // ─── Getters 
 async getAllBookTitles(): Promise<string[]> {
 await this.page.waitForSelector(this.bookTitle, { state: "visible" 
});
 return this.page.locator(this.bookTitle).allInnerTexts();
 }
 async getNoRowsText(): Promise<string> {
 await this.page.waitForSelector(this.noRowsText, { state: "visible" 
});
 return this.page.locator(this.noRowsText).innerText();
 }
 async isSpinnerVisible(): Promise<boolean> {
 try {
 await this.page.waitForSelector(this.spinner, {
 state: "visible",
 timeout: 3000,
 });
 return true;
 } catch {
 return false;
 }
 }
 async waitForBooksToLoad(): Promise<void> {
 await this.page.waitForSelector(this.bookTitle, {
 state: "visible",
 timeout: 10000,
 });
 }
 // ─── Assertions 
 async verifyPageIsVisible(): Promise<void> {
 await this.page.waitForSelector(this.bookList, { state: "visible" });
 }
 async verifyBookTitlesMatch(expectedTitles: string[]): Promise<void> {
 const { expect } = await import("@playwright/test");
 const displayedTitles = await this.getAllBookTitles();
 for (const title of expectedTitles) {
 expect(displayedTitles).toContain(title);
 }
 expect(displayedTitles.length).toBe(expectedTitles.length);
 }
 async verifyEmptyState(): Promise<void> {
 const { expect } = await import("@playwright/test");
 const text = await this.getNoRowsText();
 expect(text).toContain(BookStoreConstants.NO_ROWS_TEXT);
 }
 async verifySpinnerAppearedAndBooksLoaded(expectedCount: number): 
Promise<void> {
 const { expect } = await import("@playwright/test");
 const spinnerSeen = await this.isSpinnerVisible();
 await this.waitForBooksToLoad();
 const titles = await this.getAllBookTitles();
 expect(spinnerSeen).toBe(true);
 expect(titles.length).toBeGreaterThanOrEqual(expectedCount);
 }
}
async function delay(ms: number): Promise<void> {
    return new Promise(resolve => globalThis.setTimeout(resolve, ms));
}

