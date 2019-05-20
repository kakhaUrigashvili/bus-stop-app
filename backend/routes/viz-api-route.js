const express = require('express');
const controller = require('./../controllers/viz-api-controller');

const router = express.Router();

router.get('/routes-most-stops', controller.getRoutesWithMostStops());
router.get('/stops-most-routes', controller.getStopsWithMostRoutes());

module.exports = router;
