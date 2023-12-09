// @ts-ignore
const Spider = require('node-spider');
// @ts-ignore
const TurndownService = require('turndown');
const cheerio = require('cheerio');
const parse = require('url-parse');

const turndownService = new TurndownService();

class Crawler {
  constructor(urls, limit = 1000, textLengthMinimum = 200) {
    this.pages = [];
    this.limit = limit;
    this.urls = urls;
    this.textLengthMinimum = textLengthMinimum;
    this.count = 0;
    this.spider = {};
  }

  handleRequest(doc) {
    const $ = cheerio.load(doc.res.body);
    $("script").remove();
    $("#hub-sidebar").remove();
    $("header").remove();
    $("nav").remove();
    $("img").remove();
    const title = $("title").text() || $(".article-title").text();
    const html = $("body").html();
    const text = turndownService.turndown(html);
    console.log("crawling ", doc.url);
    const page = {
      url: doc.url,
      text,
      title,
    };
    if (text.length > this.textLengthMinimum) {
      this.pages.push(page);
    }

    doc.$("a").each((i, elem) => {
      var href = doc.$(elem).attr("href")?.split("#")[0];
      var targetUrl = href && doc.resolve(href);
      // crawl more
      console.log("targetUrl", targetUrl)
      console.log("this.urls", this.urls)
      if (
        targetUrl &&
        this.urls.some((u) => {
          const targetUrlParts = parse(targetUrl);
          const uParts = parse(u);
          return targetUrlParts.hostname === uParts.hostname;
        }) &&
        this.count < this.limit
      ) {
        this.spider.queue(targetUrl, this.handleRequest);
        this.count = this.count + 1;
      }
    });
  }

  start() {
    this.pages = [];
    return new Promise((resolve, reject) => {
      this.spider = new Spider({
        concurrent: 5,
        delay: 0,
        allowDuplicates: false,
        catchErrors: true,
        addReferrer: false,
        xhr: false,
        keepAlive: false,
        error: (err, url) => {
          console.log(err, url);
          reject(err);
        },
        // Called when there are no more requests
        done: () => {
          resolve(this.pages);
        },
        headers: { "user-agent": "node-spider" },
        encoding: "utf8",
      });
      this.urls.forEach((url) => {
        this.spider.queue(url, this.handleRequest.bind(this));
      });
    });
  }
}

module.exports = { Crawler };
