
export interface Book {
 isbn: string;
 title: string;
 subTitle: string;
 author: string;
 publish_date: string;
 publisher: string;
 pages: number;
 description: string;
 website: string;
}
export interface BooksApiResponse {
 books: Book[];
}
export const mockBooks: Book[] = [
 {
 isbn: "9781491950296",
 title: "You Don't Know JS",
 subTitle: "ES6 & Beyond",
 author: "Kyle Simpson",
 publish_date: "2015-12-27T00:00:00.000Z",
 publisher: "O'Reilly Media",
 pages: 278,
 description: "No matter how much experience you have with JavaScript, odds are you don't fully know the language.",
 website: "https://github.com/getify/You-Dont-Know-JS/tree/1st-ed",
 },
 {
 isbn: "9781491904244",
 title: "Eloquent JavaScript",
 subTitle: "A Modern Introduction to Programming",
 author: "Marijn Haverbeke",
 publish_date: "2014-12-14T00:00:00.000Z",
 publisher: "No Starch Press",
 pages: 472,
 description: "JavaScript lies at the heart of almost every modern web application.",
 website: "http://eloquentjavascript.net/",
 },
 {
 isbn: "9781593275846",
 title: "Understanding ECMAScript 6",
 subTitle: "The Definitive Guide for JavaScript Developers",
 author: "Nicholas C. Zakas",
 publish_date: "2016-09-03T00:00:00.000Z",
 publisher: "No Starch Press",
 pages: 352,
 description: "ECMAScript 6 represents the biggest update to the core of JavaScript.",
 website: "https://leanpub.com/understandinges6",
 },
];
export const emptyBooksResponse: BooksApiResponse = { books: [] };
export const mockBooksResponse: BooksApiResponse = { books: mockBooks };