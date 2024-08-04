import { test, expect, describe } from "@jest/globals";
import { normalizeURL, getURLSFromHTML } from "./crawl";

describe("Normalizing URLS", () => {
  test("Returns normalized from https url", () => {
    expect(normalizeURL("https://testURL.com/path/")).toBe("testurl.com/path");
  });

  test("Normalized from http url", () => {
    expect(normalizeURL("http://testURL.com/path/")).toBe("testurl.com/path");
  });

  test("Normalized without a / at end of path", () => {
    expect(normalizeURL("http://testURL.com/path")).toBe("testurl.com/path");
  });

  test("No path in url", () => {
    expect(normalizeURL("http://testURL.com/")).toBe("testurl.com");
  });
});

describe("Extracted list of urls", () => {
  test("Url array is returned", () => {
    const testHTMlBody: string =
      "<html><body><div><a href='https://test.dev'>Test Link</a></div></body></html>";
    expect(getURLSFromHTML(testHTMlBody, "https://test.dev")).toEqual([
      "https://test.dev/",
    ]);
  });

  test("Returns absolute from relative urls in htmlBody", () => {
    const testHTMlBody: string =
      "<html><body><div><a href='https://test.dev'>Test Link</a></div><div><a href='/path'>Test Link</a></div></body></html>";
    expect(getURLSFromHTML(testHTMlBody, "https://test.dev")).toEqual([
      "https://test.dev/",
      "https://test.dev/path",
    ]);
  });
});
