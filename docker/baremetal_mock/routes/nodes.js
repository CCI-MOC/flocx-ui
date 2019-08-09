const express = require('express');
const nodes = express.Router();

const createData = require('../data');
const Keystone = require('../keystone');

nodes.get('/detail', (req, res) => {
  const token = req.headers['x-auth-token'];
  const keystone = new Keystone(token);
  return keystone.getTokenInformation(token)
    .then((tokenInfo) => {
      const projectId = tokenInfo.token.project.id;
      const data = createData(projectId);
      res.send(data.node_list);
    })
    .catch((err) => {
      if (err instanceof TypeError) {
        return res.sendStatus(400);
      }
      return res.sendStatus(500);
    });
});

nodes.get('/:ident', (req, res) => {
  const { ident } = req.params;
  const token = req.headers['x-auth-token'];
  const keystone = new Keystone(token);
  return keystone.getTokenInformation(token)
    .then((tokenInfo) => {
      const projectId = tokenInfo.token.project.id;
      const data = createData(projectId);
      res.send(data.getNode(ident));
    })
    .catch((err) => {
      if (err instanceof TypeError) {
        return res.sendStatus(400);
      }
      return res.sendStatus(500);
    });
});

module.exports = nodes;
