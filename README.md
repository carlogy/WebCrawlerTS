# WebCrawlerTS

## Description

This is a node console application that takes a single URL, fetches the HTML content, and parses out all internal links to discover the website's structure.

## Requirements

Node >= 20.10.0

### Get Node Version

Run `nvm use`

### Installation

To install the appropriate version run `npm install`.

### Tests

To run tests on code run `npm test`

### Dev

To have the compiler listen for updates and auto compile on save run `npm run dev`. By default it will execute main.js within the dist directory on successful compilation of TS code within the src directory.

### How to Run

Run `npm start https://www.example.com`.  This will start the WebCrawler and process the provided URL.
