import path from 'path';
import express from 'express';

/**
 * Simple Node server for front-end development on a container
 */
const port = 3001;
const app = express();

const staticPath = path.join(__dirname, '/build');
app.use(express.static(staticPath));

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) console.log(err);
  console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
