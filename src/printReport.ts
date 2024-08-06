import { PageCount } from "./crawl";

const printReport = (pages: PageCount): void => {
  let reportPages: [string, number][] = [];

  try {
    reportPages = sortPages(pages);
  } catch (error) {
    console.log(error.message);
  }

  reportPages.forEach((item) =>
    console.log(`Found ${item[1]} internal links to ${item[0]}`),
  );
};

const sortPages = (pages: PageCount): [string, number][] => {
  let pagesArray: [string, number][] = [];
  try {
    pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);
  } catch (error) {
    console.log(`Error when attempting to sort pages ${pages}`);
  }
  return pagesArray;
};

export { printReport, sortPages };
