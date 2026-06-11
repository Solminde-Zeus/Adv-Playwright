
import { test, expect } from "../../fixtures/day1Fixtures";
import { BrowserWindowsConstants } from "../../Test-data/Constants";

test.describe("Browser Windows - Tab & Window Handling", () => {
 test("TC_001: New Tab button opens a new tab", async ({ browserWindowsPage }) => {
 const childTab = await browserWindowsPage.clickNewTab();
 await browserWindowsPage.verifyTabCountIs(
 BrowserWindowsConstants.EXPECTED_TAB_COUNT_AFTER_OPEN
 );
 await browserWindowsPage.closeChildPage(childTab);
 });
 test("TC_002: New tab displays the correct heading", async ({ 
browserWindowsPage }) => {
 const childTab = await browserWindowsPage.clickNewTab();
 await browserWindowsPage.verifyChildTabHeading(childTab);
 await browserWindowsPage.closeChildPage(childTab);
 });
 test("TC_003: Close child tab and switch back to parent", async ({ 
browserWindowsPage }) => {
 const childTab = await browserWindowsPage.clickNewTab();
 await browserWindowsPage.verifyTabCountIs(BrowserWindowsConstants.EXPECTED_TAB_COUNT_AFTER_OPEN);
 await browserWindowsPage.closeChildPage(childTab);
 await browserWindowsPage.verifyTabCountIs(
 BrowserWindowsConstants.EXPECTED_TAB_COUNT_AFTER_CLOSE
 );
 await browserWindowsPage.verifyParentUrlIsActive();
 await browserWindowsPage.verifyPageIsVisible();
 });
 test("TC_004: New Window Message opens with expected message text", 
async ({ browserWindowsPage }) => {
 const messageWindow = await 
browserWindowsPage.clickNewWindowMessage();
 await browserWindowsPage.verifyMessageWindowText(messageWindow);
 await browserWindowsPage.closeChildPage(messageWindow);
 });
});
