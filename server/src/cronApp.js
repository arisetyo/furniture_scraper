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

const app = express();

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
    
    // saving
    const detail = new Detail({price, link: l._id});
    await detail.save();

    await browser.close();
  });

}, interval);

// = = = = = export app = = = = = //
module.exports = app;