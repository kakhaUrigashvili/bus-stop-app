const csv = require('csvtojson');

exports.seed = knex => csv()
    .fromFile(`${__dirname}/resources/rides.csv`)
    .then(rows => knex.batchInsert('rides', rows));
