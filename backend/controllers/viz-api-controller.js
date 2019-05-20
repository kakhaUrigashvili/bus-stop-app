const knex = require('./../database/knex');

const TABLE = 'rides';

const getRoutesWithMostStops = () => async (req, res) => {
    const data = await knex.raw(`
    SELECT
    trim(regexp_split_to_table(routes, E',')) AS route,
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
        
        trim(regexp_split_to_table(routes, E',')) AS route
    FROM rides
    ) AS t
    GROUP BY stop_name
    ORDER BY number_of_routes DESC
    LIMIT 10;`);
    res.json(data.rows);
};

module.exports = {
    getRoutesWithMostStops,
    getStopsWithMostRoutes
};
