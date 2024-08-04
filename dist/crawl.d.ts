declare const normalizeURL: (urlString: string) => string;
declare const getURLSFromHTML: (htmlBody: string, baseURL: string) => string[];
interface PageCount {
    [key: string]: number;
}
declare const crawlPage: (baseURL: string, currentURL?: string, pages?: PageCount) => Promise<PageCount>;
export { normalizeURL, getURLSFromHTML, crawlPage, PageCount };
