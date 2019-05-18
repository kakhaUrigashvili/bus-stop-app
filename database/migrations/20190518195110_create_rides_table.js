const TABLE_NAME = 'rides';

exports.up = knex => knex.schema.createTable(TABLE_NAME, (table) => {
    table.integer('stop_id').primary();
    table.string('on_street').notNullable();
    table.string('cross_street').notNullable();
    table.string('routes').notNullable();
    table.decimal('boardings').notNullable();
    table.decimal('alightings').notNullable();
    table.date('month_beginning').notNullable();
    table.string('daytype').notNullable();
    table.string('location').notNullable();
});

exports.down = knex => knex.schema.dropTable(TABLE_NAME);
