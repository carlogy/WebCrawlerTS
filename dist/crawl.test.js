"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const crawl_1 = require("./crawl");
(0, globals_1.describe)("Normalizing URLS", () => {
    (0, globals_1.test)("Returns normalized from https url", () => {
        (0, globals_1.expect)((0, crawl_1.normalizeURL)("https://testURL.com/path/")).toBe("testurl.com/path");
    });
    (0, globals_1.test)("Normalized from http url", () => {
        (0, globals_1.expect)((0, crawl_1.normalizeURL)("http://testURL.com/path/")).toBe("testurl.com/path");
    });
    (0, globals_1.test)("Normalized without a / at end of path", () => {
        (0, globals_1.expect)((0, crawl_1.normalizeURL)("http://testURL.com/path")).toBe("testurl.com/path");
    });
    (0, globals_1.test)("No path in url", () => {
        (0, globals_1.expect)((0, crawl_1.normalizeURL)("http://testURL.com/")).toBe("testurl.com");
    });
});
(0, globals_1.describe)("Extracted list of urls", () => {
    (0, globals_1.test)("Url array is returned", () => {
        const testHTMlBody = "<html><body><div><a href='https://test.dev'>Test Link</a></div></body></html>";
        (0, globals_1.expect)((0, crawl_1.getURLSFromHTML)(testHTMlBody, "https://test.dev")).toEqual([
            "https://test.dev/",
        ]);
    });
    (0, globals_1.test)("Returns absolute from relative urls in htmlBody", () => {
        const testHTMlBody = "<html><body><div><a href='https://test.dev'>Test Link</a></div><div><a href='/path'>Test Link</a></div></body></html>";
        (0, globals_1.expect)((0, crawl_1.getURLSFromHTML)(testHTMlBody, "https://test.dev")).toEqual([
            "https://test.dev/",
            "https://test.dev/path",
        ]);
    });
});
