/**
 * schema for details collection
 * @author: Arie M. Prasetyo (2020)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Detail schema
 * Collection for the gathered price each hour by the cron server
 * Fields:
 * * price
 * * link (Link _id)
 */
const DetailSchema = new Schema({
  price: String,
  link: {type: Schema.Types.ObjectId, ref: 'Link'}, // link id
  createdAt: {type: Date, default: Date.now}
});

  

module.exports = mongoose.model('Detail', DetailSchema);