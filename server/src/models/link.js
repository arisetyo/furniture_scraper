/**
 * schema for links collection
 * @author: Arie M. Prasetyo (2020)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Link schema
 * Collection for url entered by user and the resulting scraped data
 * Fields:
 * * url
 * * name
 * * price
 * * description
 * * images
 */
const LinkSchema = new Schema({
  url: String,
  name: String,
  price: String,
  description: String,
  image_main: String,
  image_sec: String,
  image_tert: String,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Link', LinkSchema);