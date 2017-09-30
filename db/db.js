const Sequelize = require( 'sequelize' );
const debug = require('debug')('sql');
const pkg = require('../package.json');
const name = process.env.DATABASE_URL || pkg.name;
const connection = process.env.DATABASE_URL || `postgres://localhost/${name}`;
const db = new Sequelize(connection, { logging: debug, native: true });
const chalk = require('chalk');

console.log(chalk.yellow(`Opening database connection to ${connection}`));

module.exports = db;
