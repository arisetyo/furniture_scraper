/**
 * node js server
 * @author: Arie M. Prasetyo (2020)
 */

const mongoose = require('mongoose');
const app = require('./src/app');
const port = 3001;
const {DB_URI} = require('./src/config');

mongoose.connect(DB_URI);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
