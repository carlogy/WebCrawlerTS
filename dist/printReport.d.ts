import { PageCount } from "./crawl";
declare const printReport: (pages: PageCount) => void;
declare const sortPages: (pages: PageCount) => [string, number][];
export { printReport, sortPages };
