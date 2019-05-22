const tableName = 'routes';

exports.up = knex => knex.schema
    .raw(`
    DROP VIEW IF EXISTS ${tableName};   
    CREATE VIEW ${tableName} AS    
    SELECT route 
    FROM (
    SELECT DISTINCT TRIM(UNNEST(routes)) AS route 
    FROM stops
    ) t
    WHERE LENGTH(route)>0;`);

exports.down = knex => knex.schema
    .raw(`DROP VIEW IF EXISTS ${tableName};`);
