const knex = require('./../database/knex');

const TABLE = 'rides';

const getList = () => async (req, res) => {
    const data = await knex(TABLE).select().limit(10);
    res.json(data);
};

module.exports = {
    getList
};
