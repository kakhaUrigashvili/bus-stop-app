const knex = require('./../database/knex');

const table = {
    stops: 'stops',
    routes: 'routes',
    stopRoutes: 'stop_routes'
};

const getRouteStats = () => async (req, res) => {
    const {limit} = req.query;
    const qb = knex(table.stopRoutes)
        .select('route').count('stop_id AS numberOfStops')
        .groupBy('route')
        .orderBy('numberOfStops', 'desc');

    if (limit) {
        qb.limit(+limit);
    }

    const data = await qb;

    res.json(data);
};

const getStopStats = () => async (req, res) => {
    const {limit} = req.query;
    const qb = knex(table.stops)
        .select(
            knex.raw(
                `stop_id ||'-' || on_street || '/' || cross_street AS stop,
                cardinality(routes) AS "numberOfRoutes"`
            )
        )
        .orderBy('numberOfRoutes', 'desc');

    if (limit) {
        qb.limit(+limit);
    }

    const data = await qb;

    res.json(data);
};

const getTotalStats = () => async (req, res) => {
    const data = await Promise.all([
        knex(table.stops).count('stop_id AS numberOfStops')
            .sum('boardings AS monthlyNumberOfBoardings'),
        knex(table.routes).count('route AS numberOfRoutes')
    ]);

    res.json(Object.assign({}, data[0][0], data[1][0]));
};

const getGeo = () => async (req, res) => {
    const {route} = req.query;
    const qb = knex(table.stops)
        .select('stop_id', 'location', 'on_street', 'cross_street', 'boardings', 'alightings', 'routes');

    if (route) {
        qb.whereRaw("'{??}' && routes", [route]);
    }

    const data = await qb;
    const features = data.map(i => ({
        geometry: {
            type: 'Point',
            coordinates: [i.location[1], i.location[0]]
        },
        type: 'Feature',
        properties: {
            onStreet: i.on_street,
            crossStreet: i.cross_street,
            boardings: i.boardings,
            alightings: i.alightings,
            routes: i.routes
        },
        id: i.stop_id
    }));

    const geoJson = {
        type: 'FeatureCollection',
        features
    };

    res.json(geoJson);
};

const getRoutes = () => async (req, res) => {
    const data = await knex(table.routes).orderBy('route');

    res.json(data.map(i => i.route));
};

module.exports = {
    getRouteStats,
    getStopStats,
    getTotalStats,
    getGeo,
    getRoutes
};
