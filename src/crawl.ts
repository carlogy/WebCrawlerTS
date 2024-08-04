import { JSDOM } from "jsdom";

const normalizeURL = (urlString: string): string => {
  let urlObject: URL;
  let normalizedURL: string = "";
  try {
    urlObject = new URL(urlString);

    if (urlObject.href.endsWith("/")) {
      normalizedURL = `${urlObject.host}${urlObject.pathname.slice(0, urlObject.pathname.length - 1)}`;
    } else {
      normalizedURL = `${urlObject.host}${urlObject.pathname}`;
    }
  } catch (error) {
    console.log(error.message);
  }

  return normalizedURL;
};

const getURLSFromHTML = (htmlBody: string, baseURL: string): string[] => {
  const urlsArray: string[] = [];

  try {
    const dom: JSDOM = new JSDOM(htmlBody);
    const achorsArray: NodeListOf<HTMLAnchorElement> =
      dom.window.document.querySelectorAll("a");

    for (let address of achorsArray) {
      if (address.href) {
        if (address.href.startsWith("/")) {
          const parsedURL: URL = new URL(address.href, baseURL);
          urlsArray.push(parsedURL.href);
          continue;
        } else if (address.href.includes(baseURL)) {
          urlsArray.push(address.href);
          continue;
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }

  return urlsArray;
};

interface PageCount {
  [key: string]: number;
}

const crawlPage = async (
  baseURL: string,
  currentURL: string = baseURL,
  pages: PageCount = {},
): Promise<PageCount> => {
  if (!currentURL.includes(baseURL)) {
    return pages;
  }

  try {
    const normalizedURL: string = normalizeURL(currentURL);

    if (pages.hasOwnProperty(normalizedURL)) {
      pages[normalizedURL] += 1;
      return pages;
    } else {
      pages[normalizedURL] = 1;
    }

    const currentHTML = await fetchAndParseHTML(currentURL);
    if (currentHTML !== undefined) {
      const currentURLList = getURLSFromHTML(currentHTML, currentURL);
      for (let item of currentURLList) {
        crawlPage(baseURL, item, pages);
      }
    }
  } catch (error) {
    console.log(error.message);
  }

  return pages;
};

const fetchAndParseHTML = async (currentURL: string): Promise<string> => {
  let response: Response;

  try {
    response = await fetch(currentURL);
  } catch (error) {
    console.log(`Received ${error.mesage} on url ${currentURL}`);
  }

  const status: number = response!.status;
  const contentType: string | null = response!.headers.get("Content-type");
  const body: string = await response!.text();

  if (status >= 400) {
    console.log(
      `Error in fetch with status code: ${status}, on page: ${currentURL}`,
    );
    return `Error in fetch with status code: ${status}, on page: ${currentURL}`;
  }
  if (!contentType?.includes("text/html")) {
    console.log(
      `None html response, content-type: ${contentType}, on page: ${currentURL}`,
    );
    return `None html response, content-type: ${contentType}, on page: ${currentURL}`;
  }
  return body;
};

export { normalizeURL, getURLSFromHTML, crawlPage, PageCount };
