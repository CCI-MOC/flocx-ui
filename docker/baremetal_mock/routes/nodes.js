const express = require('express');
const nodes = express.Router();

const data = require('../data');

nodes.get('/detail', (_req, res) => {
  res.send(data.node_list);
});

module.exports = nodes;
