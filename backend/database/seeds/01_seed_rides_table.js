/* eslint-disable no-param-reassign */
const csv = require('csvtojson');

const table = 'stops';

exports.seed = knex => knex(table).truncate().then(() => csv()
    .fromFile(`${__dirname}/resources/rides.csv`) // would not scale for large input. used for simplicity
    .then((rows) => {
        rows.forEach((r) => {
            r.routes = `{"${r.routes.split(',').join('","')}"}`;
            r.location = r.location.replace('(', '{').replace(')', '}');
        });
        return knex.batchInsert(table, rows);
    }));
