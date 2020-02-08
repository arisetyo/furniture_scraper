/**
 * db configs
 * @author: Arie M. Prasetyo (2020)
 */

let DB_URI = "mongodb://localhost:27017/scraper";
DB_URI = process.env.MONGO_DB_URI ? process.env.MONGO_DB_URI : DB_URI;

module.exports = {
  DB_URI
};