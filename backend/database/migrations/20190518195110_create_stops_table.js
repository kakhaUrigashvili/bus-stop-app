const TABLE_NAME = 'stops';

exports.up = knex => knex.schema.createTable(TABLE_NAME, (table) => {
    table.integer('stop_id').primary();
    table.string('on_street').notNullable();
    table.string('cross_street').notNullable();
    table.specificType('routes', 'text[]');
    table.decimal('boardings').notNullable();
    table.decimal('alightings').notNullable();
    table.date('month_beginning').notNullable();
    table.string('daytype').notNullable();
    table.specificType('location', 'float[]').notNullable();
});

exports.down = knex => knex.schema.dropTable(TABLE_NAME);
