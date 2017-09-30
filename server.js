const http = require( 'http' );
const app = require( './app' );
const db = require( './db' );
const server = http.createServer(app);
const chalk = require( 'chalk' );

const port = process.env.PORT || 3000;

// db.seed()
db.sync()
.then(() => server.listen(port, () => console.log(chalk.yellow(`listening on port ${ port }`))))
.catch(err => {
  console.error(chalk.red('Error while seeding'));
  console.log(err);
});
