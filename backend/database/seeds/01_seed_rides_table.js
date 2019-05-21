/* eslint-disable no-param-reassign */
const csv = require('csvtojson');

exports.seed = knex => csv()
    .fromFile(`${__dirname}/resources/rides.csv`)
    .then((rows) => {
        rows.forEach((r) => {
            r.routes = `{"${r.routes.split(',').join('","')}"}`;
            r.location = r.location.replace('(', '{').replace(')', '}');
        });
        return knex.batchInsert('stops', rows);
    });
