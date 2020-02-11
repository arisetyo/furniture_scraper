/**
 * cron server
 * @author: Arie M. Prasetyo (2020)
 */

const mongoose = require('mongoose');
const app = require('./src/cronApp');
const port = 3002;
const {DB_URI} = require('./src/config');

mongoose.connect(DB_URI);

// Start the cron app
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});