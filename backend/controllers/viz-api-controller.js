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

const getRouteBoardingStats = () => async (req, res) => {
    const {limit} = req.query;

    const qb = knex.from(table.stopRoutes)
        .select('route').sum('boardings AS numberOfBoardings')
        .innerJoin(table.stops, `${table.stops}.stop_id`, `${table.stopRoutes}.stop_id`)
        .groupBy('route')
        .orderBy('numberOfBoardings', 'desc');

    if (limit) {
        qb.limit(+limit);
    }

    const data = await qb;

    res.json(data);
};

const getStopBoardingStats = () => async (req, res) => {
    const {limit} = req.query;
    const qb = knex(table.stops)
        .select(
            knex.raw(
                `stop_id ||'-' || on_street || '/' || cross_street AS stop,
                boardings AS "numberOfBoardings"`
            )
        )
        .orderBy('numberOfBoardings', 'desc');

    if (limit) {
        qb.limit(+limit);
    }

    const data = await qb;

    res.json(data);
};

const getTotalStats = () => async (req, res) => {
    const {route} = req.query;
    const qbs = [
        knex(table.stops).count('stop_id AS numberOfStops')
            .sum('boardings AS monthlyNumberOfBoardings')
            .avg('boardings AS averageMonthlyNumberOfBoardingsPerStop'),
        knex(table.routes).count('route AS numberOfRoutes')
    ];

    if (route) {
        qbs[0].whereRaw("'{??}' && routes", [route]);
        qbs[1].whereIn('route', route);
    }

    const data = await Promise.all(qbs);

    res.json(Object.assign({}, data[0][0], data[1][0]));
};

const getGeo = () => async (req, res) => {
    const {route} = req.query;
    const qbs = [
        knex(table.stops).max('boardings AS maxBoardings'),
        knex(table.stops)
            .select('stop_id', 'location', 'on_street', 'cross_street', 'boardings', 'alightings', 'routes')
    ];

    if (route) {
        qbs.forEach(qb => qb.whereRaw("'{??}' && routes", [route]));
    }

    const data = await Promise.all(qbs);

    const {maxBoardings} = data[0][0];

    const features = data[1].map(i => ({
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
            routes: i.routes,
            maxBoardings

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
    getRouteBoardingStats,
    getStopBoardingStats,
    getTotalStats,
    getGeo,
    getRoutes
};
