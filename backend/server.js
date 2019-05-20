const express = require('express');
const log = require('fancy-log');
const morgan = require('morgan');
const pck = require('./package.json');
const corsMiddleware = require('./middleware/cors');
const notFoundMiddleware = require('./middleware/not-found');
const vizApiRoutes = require('./routes/viz-api-route');

const port = process.env.PORT || 3000;

const app = express();

// before request  middleware
app.use(morgan('tiny'));
app.use(corsMiddleware());

// api routes
app.use('/api', vizApiRoutes);

// main route
app.use('/', (req, res) => res.json({app: pck.name, version: pck.version}));

// after request middleware
app.use(notFoundMiddleware);

// starting
app.listen(port, () => log.info(`Listening on port ${port} in ${app.get('env')} mode`));

module.exports = app;
