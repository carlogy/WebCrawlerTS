import { test, expect, describe } from "@jest/globals";
import { printReport } from "./printReport";
import { PageCount } from "./crawl";

describe("Test report printing logic", () => {
  test("Prints report", () => {
    const pages: PageCount = { "test.dev": 3, "test.dev/path": 2 };

    const logSpy = jest.spyOn(console, "log");

    printReport(pages);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(2);

    expect(logSpy.mock.calls).toEqual([
      ["Found 3 internal links to test.dev"],
      ["Found 2 internal links to test.dev/path"],
    ]);

    logSpy.mockRestore();
  });
});
