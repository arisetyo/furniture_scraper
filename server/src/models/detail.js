/**
 * schema for details collection
 * @author: Arie M. Prasetyo (2020)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailSchema = new Schema({
  name: String,
  price: String,
  description: String,
  link: {type: Schema.Types.ObjectId, ref: 'Link'},
  createdAt: {type: Date, default: Date.now}
});

  

module.exports = mongoose.model('Detail', DetailSchema);