"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const printReport_1 = require("./printReport");
(0, globals_1.describe)("Test report printing logic", () => {
    (0, globals_1.test)("Prints report", () => {
        const pages = { "test.dev": 3, "test.dev/path": 2 };
        const logSpy = jest.spyOn(console, "log");
        (0, printReport_1.printReport)(pages);
        (0, globals_1.expect)(logSpy).toHaveBeenCalled();
        (0, globals_1.expect)(logSpy).toHaveBeenCalledTimes(2);
        (0, globals_1.expect)(logSpy.mock.calls).toEqual([
            ["Found 3 internal links to test.dev"],
            ["Found 2 internal links to test.dev/path"],
        ]);
        logSpy.mockRestore();
    });
});
