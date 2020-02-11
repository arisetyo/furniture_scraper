/**
 * cron app to scrap price data
 * @author: Arie M. Prasetyo (2020)
 */
const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
//
const Detail = require('./models/detail');
const Link = require('./models/link');

/**
 * Cron server app
 * scrap and save price data in an interval of time
 */
const app = express();

// set interval to one hour
const interval = 60 * 60 * 1000;

setInterval( async () => {

  const links = await Link.find({}, {url: 1, _id: 1});
  links.forEach(async l => {
    // load the page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(l.url);
    await page.waitFor(1000); // wait for 1 seconds

    const content = await page.content();
    await page.close();

    // scraping
    const $ = cheerio.load(content);
    const price = $('.product-info-main .special-price .price-wrapper > .price').text().trim();

    await browser.close();

    // saving
    const detail = new Detail({price, link: l._id});
    await detail.save();
  });

}, interval);

// = = = = = export app = = = = = //
module.exports = app;