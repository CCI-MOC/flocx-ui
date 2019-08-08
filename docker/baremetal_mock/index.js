const express = require('express');
const bodyParser = require('body-parser');

const nodesRoute = require('./routes/nodes');

const v1 = express.Router();
v1.use('/nodes', nodesRoute);

const app = express();
app.use(bodyParser.json());
app.use('/v1', v1);

const listener = app.listen(80, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${listener.address().port}`);
});
