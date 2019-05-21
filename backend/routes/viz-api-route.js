const express = require('express');
const controller = require('./../controllers/viz-api-controller');

const router = express.Router();

router.get('/routes-most-stops', controller.getRoutesWithMostStops());
router.get('/stops-most-routes', controller.getStopsWithMostRoutes());
router.get('/boardings-per-location', controller.getBoardingsPerLocation());
router.get('/chicago-geo-map', controller.chicagoGeo());
router.get('/geo-points', controller.geoPoints());

module.exports = router;
