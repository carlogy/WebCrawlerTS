"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const node_process_1 = require("node:process");
const crawl_1 = require("./crawl");
const printReport_1 = require("./printReport");
async function main() {
    if (node_process_1.argv.length > 3) {
        console.log(`Error the number of arguments passed is more than required to execute.`);
        process.exit(1);
    }
    if (node_process_1.argv.length < 3) {
        console.log(`Error the number of arguments passed is less than required to execute.`);
        process.exit(1);
    }
    try {
        const baseURL = node_process_1.argv[2];
        console.log(`Starting crawling on the page ${baseURL}`);
        const totalPages = await (0, crawl_1.crawlPage)(baseURL);
        (0, printReport_1.printReport)(totalPages);
    }
    catch (error) {
        console.log(error.message);
    }
}
main();
