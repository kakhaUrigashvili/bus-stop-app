const express = require('express');
const controller = require('./../controllers/viz-api-controller');

const router = express.Router();

router.get('/stats/route', controller.getRouteStats());
router.get('/stats/stop', controller.getStopStats());
router.get('/stats/boarding-routes', controller.getRouteBoardingStats());
router.get('/stats/boarding-stops', controller.getStopBoardingStats());
router.get('/stats/total', controller.getTotalStats());
router.get('/geo', controller.getGeo());
router.get('/routes', controller.getRoutes());

module.exports = router;
