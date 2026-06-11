
import { test, expect } from "../../fixtures/day1Fixtures";
import { mockBooksResponse, emptyBooksResponse, mockBooks } from "../../Test-data/books";
/**
* Day 1 — Network Mocking
*
* NM_001 Mock Books API with custom books — verify UI reflects mocked 
data
* NM_002 Mock empty response — verify empty state message
* NM_003 Delay API response — verify loading/spinner behavior
*
* Rules:
* - No page object construction in spec (handled by fixture)
* - No route() calls in spec (all mocking logic lives in BookStorePage 
POM)
* - No hardcoded strings, URLs, delays, or counts
* - Spec only calls POM action methods and POM verify* methods
*/
test.describe("Network Mocking — Book Store API", () => {
 test("NM_001: Mocked Books API — UI displays only the mocked books", 
async ({ bookStorePage }) => {
 await bookStorePage.mockBooksApi(mockBooksResponse);
 await bookStorePage.goto();
 await bookStorePage.verifyBookTitlesMatch(
 mockBooks.map((b) => b.title)
 );
 });
 test("NM_002: Empty Books API response — empty state is shown", async ({ bookStorePage }) => {
 await bookStorePage.mockBooksApi(emptyBooksResponse);
 await bookStorePage.goto();
 await bookStorePage.verifyEmptyState();
 });
 test("NM_003: Delayed Books API response — spinner appears then books load", async ({ bookStorePage }) => {
 await bookStorePage.mockBooksApiWithDelay(mockBooksResponse);
 await bookStorePage.goto();
 await bookStorePage.verifySpinnerAppearedAndBooksLoaded(mockBooks.length);
 });
});