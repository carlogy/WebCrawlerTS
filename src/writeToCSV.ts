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

  const results: string[] = [];

  if (sortedPages.length > 0) {
    results.push(...buildResults(sortedPages));
  }

  try {
    // To Do complete writing file
    fs.writeFile(
      `./results/${domainResult}.csv`,
      results.toLocaleString(),
      (error) => {
        if (error) {
          console.log(error.message);
        }
      },
    );
  } catch (error) {
    console.log(error.message);
  }

  console.log(
    `\x1b[32mSuccessfully wrote crawl results from ${domain} to ./results directory 🎉\x1b[0m`,
  );
  return "Success";
};

const buildResults = (sortedPages: [string, number][]): string[] => {
  const results: string[] = ["URL, Total\n"];

  sortedPages.forEach((line) => {
    results.push(`${line[0]},${line[1]}\n`);
  });

  return results;
};

export { writeToCSV };
