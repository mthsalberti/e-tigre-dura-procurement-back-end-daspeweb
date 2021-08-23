const {DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_POOL_MIN, DB_POOL_MAX} = process.env
// Update with your config settings.
console.log('__dirname', __dirname)
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            database: 'etigre_dura_procurement_db',
            user: 'root',
            password: 'tigre310102',
            port: '3306',
        },
        debug: false,
        pool: {
            min: 1,
            max: 5
        },
        migrations: {
            tableName: '_knex_migrations',
            directory: __dirname + '/src/db/migrations'
        },
        seeds: {
            tableName: '_knex_seeds',
            directory: __dirname + '/src/db/seeds'
        }
    }
};
