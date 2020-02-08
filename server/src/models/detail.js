/**
 * schema for details collection
 * @author: Arie M. Prasetyo (2020)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  name: String,
  type: {type: String, default: 'Furniture'},
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Detail', DetailSchema);