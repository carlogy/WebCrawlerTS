"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortPages = exports.printReport = void 0;
const printReport = (pages) => {
    let reportPages = [];
    try {
        reportPages = sortPages(pages);
    }
    catch (error) {
        console.log(error.message);
    }
    reportPages.forEach((item) => console.log(`Found ${item[1]} internal links to ${item[0]}`));
};
exports.printReport = printReport;
const sortPages = (pages) => {
    let pagesArray = [];
    try {
        pagesArray = Object.entries(pages);
        pagesArray.sort((a, b) => b[1] - a[1]);
    }
    catch (error) {
        console.log(`Error when attempting to sort pages ${pages}`);
    }
    return pagesArray;
};
exports.sortPages = sortPages;
