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

const getTotalStats = () => async (req, res) => {
    const data = await knex.raw(`
    SELECT 
        COUNT(DISTINCT stop_id) AS "numberOfStops",
        COUNT(DISTINCT route) AS "numberOfRoutes",
        (SELECT SUM(boardings) FROM ${TABLE})::INT AS "monthlyNumberOfBoardings"
    FROM (
    SELECT
        stop_id,
        UNNEST(routes) AS route
    FROM
    ${TABLE}
    ) AS T;`);
    res.json(data.rows[0]);
};

const chicagoGeo = () => async (req, res) => {
    const filePath = path.join(__dirname, '../resources', 'chicago.geojson');
    const data = await readFileAsync(filePath, 'utf8');
    res.set('Content-Type', 'application/json');
    res.send(data);
};

const geoPoints = () => async (req, res) => {
    const data = await knex.raw(`
    SELECT
        stop_id,
        location,
        on_street,
        cross_street
    FROM
        ${TABLE};`);
    const features = data.rows.map(i => ({
        geometry: {
            type: 'Point',
            coordinates: [i.location[1], i.location[0]]
        },
        type: 'Feature',
        properties: {
            popupContent: `${i.on_street}/${i.cross_street}`
        },
        id: i.stop_id
    }));

    const geoJson = {
        type: 'FeatureCollection',
        features
    };

    res.json(geoJson);
};

module.exports = {
    getRoutesWithMostStops,
    getStopsWithMostRoutes,
    getTotalStats,
    getBoardingsPerLocation,
    chicagoGeo,
    geoPoints
};
