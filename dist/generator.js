"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resultsGenerator;
function* resultsGenerator(iterable, start = 0, end = iterable.length, step = 1) {
    for (let i = start; i < end; i += step) {
        yield iterable[i];
    }
}
