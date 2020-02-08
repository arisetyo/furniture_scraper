/**
 * main server application
 * @author: Arie M. Prasetyo (2020)
 */
const bodyParser = require("body-parser");
const express = require('express');
const Detail = require('./models/detail');
const Link = require('./models/link');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (_, res) => {
  res.json({msg: `This is API server. Format "/api/v1/<collection name>"`});
});

// API endpoints
// - Link
app.get('/api/v1/scraper/link', async (_, res) => {
  const link = await Link.find({});
  res.json(link);
});

app.post('/api/v1/scraper/link', async (req, res) => {
  const link = new Link({
    name: req.body.name
  });

  const savedLink = await link.save();
  res.json(savedLink);
});

// - Detail
app.get('/api/v1/scraper/detail', async (_, res) => {
  const detail = await Detail.find({});
  res.json(detail);
});

app.post('/api/v1/scraper/detail', async (req, res) => {
  const detail = new Detail({
    name: req.body.name
  });

  const savedDetail = await detail.save();
  res.json(savedDetail);
});

// export app
module.exports = app;
