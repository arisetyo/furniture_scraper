/**
 * schema for links collection
 * @author: Arie M. Prasetyo (2020)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
  url: String,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Link', LinkSchema);