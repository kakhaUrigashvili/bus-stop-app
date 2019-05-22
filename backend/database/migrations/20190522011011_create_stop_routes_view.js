const tableName = 'stop_routes';

exports.up = knex => knex.schema
    .raw(`
    DROP VIEW IF EXISTS ${tableName};   
    CREATE VIEW ${tableName} AS    
    SELECT stop_id, route
    FROM (
    SELECT stop_id, TRIM(UNNEST(routes)) AS route 
    FROM stops
    ) t
    WHERE LENGTH(route)>0;`);

exports.down = knex => knex.schema
    .raw(`DROP VIEW IF EXISTS ${tableName};`);
