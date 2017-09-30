const db = require( './db' )
const Student = require( './Student' );
const Campus = require( './Campus' );

Student.belongsTo(Campus);
Campus.hasMany(Student);

const sync = () => db.sync({force: true});

module.exports = { sync, models: { Student, Campus } };
