const express = require('express');
const log = require('fancy-log');
const path = require('path');
const morgan = require('morgan');
const corsMiddleware = require('./middleware/cors');
const notFoundMiddleware = require('./middleware/not-found');
const vizApiRoutes = require('./routes/viz-api-route');

const port = process.env.PORT || 3000;

const app = express();

// before request  middleware
app.use(morgan('tiny'));
app.use(corsMiddleware());

// api routes
app.use('/api/v1', vizApiRoutes);

// frontend resources
app.use('/', express.static(path.join(__dirname, 'public')));

// after request middleware
app.use(notFoundMiddleware);

// starting
app.listen(port, () => log.info(`Listening on port ${port} in ${app.get('env')} mode`));

module.exports = app;
