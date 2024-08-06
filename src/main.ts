import { argv } from "node:process";
import { crawlPage } from "./crawl";
import { printReport } from "./printReport";
import { writeToCSV } from "./writeToCSV";

async function main(): Promise<void> {
  if (argv.length > 3) {
    console.log(
      `Error the number of arguments passed is more than required to execute.`,
    );
    process.exit(1);
  }

  if (argv.length < 3) {
    console.log(
      `Error the number of arguments passed is less than required to execute.`,
    );
    process.exit(1);
  }

  try {
    const baseURL: string = argv[2];
    console.log(`Starting crawling on the page ${baseURL}`);

    const totalPages = await crawlPage(baseURL);
    //if just want to print results to the console : printReport(totalPages);
    writeToCSV(totalPages, baseURL);
  } catch (error) {
    console.log(error.message);
  }
}

main();

export { main };
