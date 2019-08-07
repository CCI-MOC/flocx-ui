const express = require('express');
const bodyParser = require('body-parser');

const nodesRoute = require('./routes/nodes');

const v1 = express.Router();
v1.use('/nodes', nodesRoute);

const app = express();
app.use(bodyParser.json());
app.use('/v1', v1);

app.listen(80);
