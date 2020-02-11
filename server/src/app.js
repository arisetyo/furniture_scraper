/**
 * main server application
 * @author: Arie M. Prasetyo (2020)
 */
const bodyParser = require('body-parser');
const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
//
const Detail = require('./models/detail');
const Link = require('./models/link');

/**
 * Main server app
 * serves API's to interact with the database
 */
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * default API endpoint
 */
app.get('/', (_, res) => {
  res.json({msg: `This is API server. Format "/api/v1/<collection name>"`});
});

/**
 * = = = = = = = = = = = = = = Link
 * Link is the url and its scraped data
 */

/**
 * A-1.GET link
 * Load a particular link data based on its data
 */
app.get('/api/v1/scraper/link', async (req, res) => {
  const id = req.query.id;
  const link = await Link.findById(id);
  res.json(link);
});

/**
 * A-2. POST link
 * Scrap all data from a link and then save the resulting data
 */
app.post('/api/v1/scraper/link', async (req, res) => {
  const url = req.body.url;

  // load the page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitFor(5000);

  const content = await page.content();
  await page.close();

  // scraping
  const $ = cheerio.load(content);
  const name = $('h1.page-title').text().trim();
  const price = $('.product-info-main .special-price .price-wrapper > .price').text().trim();
  const description = $('.product-info__description #description').text().trim();

  const images = $('.fotorama__stage__frame').find('img');
  const image_main = images && images[0] ? images[0].attribs.src : '';
  const image_sec  = images && images[1] ? images[1].attribs.src : '';
  const image_tert = images && images[2] ? images[2].attribs.src : '';
  
  // saving
  const link = new Link({url, name, price, description, image_main, image_sec, image_tert});
  const savedLink = await link.save();
  await browser.close();
  res.json(savedLink);
});

/**
 * A-3. GET all links
 * Load all links
 */
app.get('/api/v1/scraper/links', async (_, res) => {
  const links = await Link.find();
  res.json(links);
});

/**
 * = = = = = = = = = = = = = = Detail
 * Detail is the scraped data gathered each hour from the recorded links
 * Data is link_id and price
 */

/**
 * B-1. GET detail
 * Load all price details for a particular link
 * @param string link Link ID
 */
app.get('/api/v1/scraper/detail', async (req, res) => {
  const link = req.query.link;
  const detail = await Detail.find({link});
  res.json(detail);
});

/**
 * B-2. GET all details
 * Load all details in the collection (testing purpose)
 */
app.get('/api/v1/scraper/details', async (_, res) => {
  const details = await Detail.find();
  res.json(details);
});

/**
 * B-3. POST detail
 * Save a detail
 * 
 * @var price the price
 * @var link link id
 * 
 */
app.post('/api/v1/scraper/detail', async (req, res) => {
  const {price, link} = req.body;
  const detail = new Detail({price, link});
  const savedDetail = await detail.save();
  res.json(savedDetail);
});


// = = = = = export app = = = = = //
module.exports = app;
