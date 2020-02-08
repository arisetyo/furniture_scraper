/**
 * scraper engine
 * @author: Arie M. Prasetyo (2020)
 */

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

/**
 * scraping
 * - open the url with a headless browser
 * - get the values based on specific class names and/or id
 * - return to the app for saving
 */
const getScrapData = url => {
  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url).then(() => {
        return page.content();
      });
    })
    .then(html => {
      const $ = cheerio.load(html);
      
      const name = $('h1.page-title').text().trim();
      const price = $('.product-info-main .special-price .price-wrapper > .price').text().trim();
      const description = $('.product-info__description #description').text().trim();

      return {
        name, price, description
      }
    })
    .catch(e => {
      return {error: e}
    });
};


module.exports = {
  getScrapData
};