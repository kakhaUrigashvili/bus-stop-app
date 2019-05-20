// eslint-disable-next-line import/order
const knexfile = require('../knexfile');
const debug = require('debug')('app:sql');

const knex = require('knex')(knexfile);

knex.on('query', (query) => {
    debug(query.toString());
});
module.exports = knex;
