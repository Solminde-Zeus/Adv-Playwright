// ─── Browser Windows 

export const BrowserWindowsConstants = {
 URL: "https://demoqa.com/browser-windows",
 SAMPLE_PAGE_HEADING: "This is a sample page",
 MESSAGE_WINDOW_TEXT: "Knowledge increases by sharing but not by saving",
 PARENT_URL_FRAGMENT: "browser-windows",
 EXPECTED_TAB_COUNT_AFTER_OPEN: 2,
 EXPECTED_TAB_COUNT_AFTER_CLOSE: 1,
} as const;


// ─── Book Store 
export const BookStoreConstants = {
 URL: "https://demoqa.com/books",
 API_PATTERN: "**/BookStore/v1/Books",
 NO_ROWS_TEXT: "No rows found",
 DELAY_MS: 3000,
} as const;