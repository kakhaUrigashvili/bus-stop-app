const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const knex = require('./../database/knex');

const readFileAsync = promisify(fs.readFile);
const TABLE = 'stops';

const getRoutesWithMostStops = () => async (req, res) => {
    const data = await knex.raw(`
    SELECT
    unnest(routes) AS route,
    count(stop_id) AS number_of_stops
    FROM ${TABLE}
    GROUP BY route
    ORDER BY number_of_stops DESC
    LIMIT 10;`);
    res.json(data.rows);
};

const getStopsWithMostRoutes = () => async (req, res) => {
    const data = await knex.raw(`
    SELECT 
    stop_name,
    COUNT(DISTINCT route) AS number_of_routes
    FROM (
    SELECT
        stop_id || ':'||on_street||'/'||cross_street AS stop_name,
        
        unnest(routes) AS route
    FROM ${TABLE}
    ) AS t
    GROUP BY stop_name
    ORDER BY number_of_routes DESC
    LIMIT 10;`);
    res.json(data.rows);
};

const getBoardingsPerLocation = () => async (req, res) => {
    const data = await knex.raw(`
    SELECT on_street||'/'||cross_street AS name, 
    array_append(location,boardings::float) AS value 
    FROM ${TABLE};`);
    res.json(data.rows);
};

const chicagoGeo = () => async (req, res) => {
    const filePath = path.join(__dirname, '../resources', 'chicago.geojson');
    const data = await readFileAsync(filePath, 'utf8');
    res.set('Content-Type', 'application/json');
    res.send(data);
};

module.exports = {
    getRoutesWithMostStops,
    getStopsWithMostRoutes,
    getBoardingsPerLocation,
    chicagoGeo
};
