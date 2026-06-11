
import { test as base } from "@playwright/test";
import { BrowserWindowsPage } from "../pages/BRowserWindoesPage";
import { BookStorePage } from "../pages/BookStorePage";
// ─── Fixture type declarations 
type Day1Fixtures = {
 browserWindowsPage: BrowserWindowsPage;
 bookStorePage: BookStorePage;
};
// ─── Extended test with fixtures 
export const test = base.extend<Day1Fixtures>({
 browserWindowsPage: async ({ page, context }, use) => {
 const browserWindowsPage = new BrowserWindowsPage(page, context);
 await browserWindowsPage.goto();
 await browserWindowsPage.verifyPageIsVisible();
 await use(browserWindowsPage);
 },
 bookStorePage: async ({ page }, use) => {
 const bookStorePage = new BookStorePage(page);
 
 },
});
export { expect } from "@playwright/test";
