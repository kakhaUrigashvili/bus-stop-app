const pg = require('pg');

const PG_BIGINT_OID = 20;
const PG_NUMERIC_OID = 1700;
pg.types.setTypeParser(PG_BIGINT_OID, parseFloat);
pg.types.setTypeParser(PG_NUMERIC_OID, parseFloat);

const config = require('config').db;

module.exports = config;
