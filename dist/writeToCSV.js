"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const printReport_1 = require("./printReport");
const writeToCSV = (pages, domain) => {
    console.log("Writing to .csv file ⏳");
    let sortedPages = [];
    let domainResult = new URL(domain).hostname;
    try {
        sortedPages = (0, printReport_1.sortPages)(pages);
    }
    catch (error) {
        console.log(`\x1b[31mRan into an error attempting to sort the results\n${error.message}\x1b[0m`);
    }
    // const results: string[] = [];
    let results;
    if (sortedPages.length > 0) {
        results = buildResults(sortedPages);
    }
    try {
        fs_1.default.writeFile(`./results/${domainResult}.csv`, results, (error) => {
            if (error) {
                console.log(error.message);
            }
        });
    }
    catch (error) {
        console.log(error.message);
    }
    console.log(`\x1b[32mSuccessfully wrote crawl results from ${domain} to ./results directory 🎉\x1b[0m`);
    return "Success";
};
exports.writeToCSV = writeToCSV;
const buildResults = (sortedPages) => {
    // const results: string[] = ["URL, Total\n"];
    let resultString = "URL,Total\n";
    sortedPages.forEach((line) => {
        resultString += `${line[0]},${line[1]}\n`;
    });
    return resultString;
};
