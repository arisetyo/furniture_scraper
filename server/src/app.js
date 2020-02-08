/**
 * main server application
 * @author: Arie M. Prasetyo (2020)
 */
const bodyParser = require("body-parser");
const express = require('express');
const Detail = require('./models/detail');
const Link = require('./models/link');
// const {getScrapData} = require('./scraper');

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API endpoints
app.get('/', (_, res) => {
  res.json({msg: `This is API server. Format "/api/v1/<collection name>"`});
});

// = = = = = = = = = = = = = = Link
// A-1. LOAD
app.get('/api/v1/scraper/link', async (_, res) => {
  const link = await Link.find({});
  res.json(link);
});

// A-2. SAVE
app.post('/api/v1/scraper/link', async (req, res) => {
  // a. saving the url to list collection
  const url = req.body.url;
  const link = new Link({url});
  const savedLink = await link.save();

  // b. scraping
  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url).then(() => {
        return page.content();
      });
    })
    .then(async html => {
      const $ = cheerio.load(html);
      
      // c. getting details
      const name = $('h1.page-title').text().trim();
      const price = $('.product-info-main .special-price .price-wrapper > .price').text().trim();
      const description = $('.product-info__description #description').text().trim();

      // d. saving details
      const detail = new Detail({name, price, description, link: savedLink._id});
      const savedDetail = await detail.save();
      res.json(savedDetail);
    })
    .catch(e => {
      res.json({error: 'scraping failed'});
    });
});

// A-3. LOAD ALL
app.get('/api/v1/scraper/links', async (_, res) => {
  const links = await Link.find();
  res.json(links);
});

// = = = = = = = = = = = = = = Detail
// B-1. LOAD BY ID
app.get('/api/v1/scraper/detail', async (req, res) => {
  const link = req.query.link;
  const detail = await Detail.find({link});
  res.json(detail[0]);
});

// B-3. SAVE
app.post('/api/v1/scraper/detail', async (req, res) => {
  const {name, price, description} = req.body;
  const detail = new Detail({name, price, description, link: '5e3ed28a0ac5930df029fb72'});
  const savedDetail = await detail.save();
  res.json(savedDetail);
});

// export app
module.exports = app;
