"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlPage = exports.getURLSFromHTML = exports.normalizeURL = void 0;
const jsdom_1 = require("jsdom");
const normalizeURL = (urlString) => {
    let urlObject;
    let normalizedURL = "";
    try {
        urlObject = new URL(urlString);
        if (urlObject.href.endsWith("/")) {
            normalizedURL = `${urlObject.host}${urlObject.pathname.slice(0, urlObject.pathname.length - 1)}`;
        }
        else {
            normalizedURL = `${urlObject.host}${urlObject.pathname}`;
        }
    }
    catch (error) {
        console.log(error.message);
    }
    return normalizedURL;
};
exports.normalizeURL = normalizeURL;
const getURLSFromHTML = (htmlBody, baseURL) => {
    const urlsArray = [];
    try {
        const dom = new jsdom_1.JSDOM(htmlBody);
        const achorsArray = dom.window.document.querySelectorAll("a");
        for (let address of achorsArray) {
            if (address.href) {
                if (address.href.startsWith("/")) {
                    const parsedURL = new URL(address.href, baseURL);
                    urlsArray.push(parsedURL.href);
                    continue;
                }
                else if (address.href.includes(baseURL)) {
                    urlsArray.push(address.href);
                    continue;
                }
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
    return urlsArray;
};
exports.getURLSFromHTML = getURLSFromHTML;
const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {
    if (!currentURL.includes(baseURL)) {
        return pages;
    }
    try {
        const normalizedURL = normalizeURL(currentURL);
        if (pages.hasOwnProperty(normalizedURL)) {
            pages[normalizedURL] += 1;
            return pages;
        }
        else {
            pages[normalizedURL] = 1;
        }
        const currentHTML = await fetchAndParseHTML(currentURL);
        if (currentHTML !== undefined) {
            const currentURLList = getURLSFromHTML(currentHTML, currentURL);
            for (let item of currentURLList) {
                crawlPage(baseURL, item, pages);
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
    return pages;
};
exports.crawlPage = crawlPage;
const fetchAndParseHTML = async (currentURL) => {
    let response;
    try {
        response = await fetch(currentURL);
    }
    catch (error) {
        console.log(`Received ${error.mesage} on url ${currentURL}`);
    }
    const status = response.status;
    const contentType = response.headers.get("Content-type");
    const body = await response.text();
    if (status >= 400) {
        console.log(`Error in fetch with status code: ${status}, on page: ${currentURL}`);
        return `Error in fetch with status code: ${status}, on page: ${currentURL}`;
    }
    if (!contentType?.includes("text/html")) {
        console.log(`None html response, content-type: ${contentType}, on page: ${currentURL}`);
        return `None html response, content-type: ${contentType}, on page: ${currentURL}`;
    }
    return body;
};
