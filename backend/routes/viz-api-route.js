const express = require('express');
const controller = require('./../controllers/viz-api-controller');

const router = express.Router();

router.get('/sample-data', controller.getList());

module.exports = router;
