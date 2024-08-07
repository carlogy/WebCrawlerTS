import fs from "fs";

import { PageCount } from "./crawl";
import { sortPages } from "./printReport";

const writeToCSV = (pages: PageCount, domain: string): string => {
  console.log("Writing to .csv file ⏳");
  let sortedPages: [string, number][] = [];
  let domainResult: string = new URL(domain).hostname;

  try {
    sortedPages = sortPages(pages);
  } catch (error) {
    console.log(
      `\x1b[31mRan into an error attempting to sort the results\n${error.message}\x1b[0m`,
    );
  }

  // const results: string[] = [];
  let results;

  if (sortedPages.length > 0) {
    results = buildResults(sortedPages);
  }

  try {
    fs.writeFile(`./results/${domainResult}.csv`, results, (error) => {
      if (error) {
        console.log(error.message);
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  console.log(
    `\x1b[32mSuccessfully wrote crawl results from ${domain} to ./results directory 🎉\x1b[0m`,
  );
  return "Success";
};

const buildResults = (sortedPages: [string, number][]): string => {
  // const results: string[] = ["URL, Total\n"];

  let resultString = "URL,Total\n";

  sortedPages.forEach((line) => {
    resultString += `${line[0]},${line[1]}\n`;
  });

  return resultString;
};

export { writeToCSV };
