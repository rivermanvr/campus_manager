const Promise = require('bluebird');
const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');
const chalk = require( 'chalk' );

const db = require('./db');
const Student = require('./db/Student');
const Campus = require('./db/Campus');

const numStudent = 25;
const emails = chance.unique(chance.email, numStudent);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  var id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randStudent () {
  var gender = chance.gender();
  return Student.build({
    name: [chance.first({gender: gender}), chance.last()].join(' '),
    photo: randPhoto(gender),
    phone: chance.phone(),
    email: emails.pop(),
  });
}

function generateStudents () {
  var students = doTimes(numStudent, randStudent);
  return students;
}

function createStudent () {
  return Promise.map(generateStudents(), function (student) {
    return student.save();
  });
}

function seedStudents () {
  return createStudent()
}

//---------------------------------------

function seedCampus () {
  const promiseArr = [];
  const campusName = [
    'Advanced Sciences',
    'School - Architecture',
    'Hall of Medicine',
    'Discovery Center'
  ];
  const campusPhoto = [
    '/assets/images/Bldg-1.jpeg',
    '/assets/images/Bldg-2.jpeg',
    '/assets/images/Bldg-3.jpeg',
    '/assets/images/Bldg-4.jpeg'
  ];
  const campusPhone = [
    '973-256-8050',
    '973-256-8070',
    '973-256-8090',
    '973-256-8080'
  ];
  promiseArr.push(Campus.create({
    name: 'Unassigned Students'
  }));
  for (let i = 0; i < campusName.length; i++) {
    promiseArr.push(Campus.create({
      name: campusName[i],
      photo: campusPhoto[i],
      phone: campusPhone[i]
    }));
  }
  return Promise.all(promiseArr);
}

console.log(chalk.yellow('Syncing database'));

db.sync({force: true})
.then(() => {
  console.log(chalk.yellow('Seeding Campuses'));
  return seedCampus();
})
.then(() => {
  console.log(chalk.yellow('Seeding Students'));
  return seedStudents();
})
.then(students => {
  let counter = 0;
  const promiseArr = students.map(student => {
    if (counter === 5) counter = 0;
    counter++;
    student.campusId = counter;
    return student.save();
  })
  return Promise.all(promiseArr);
})
.catch(err => {
  console.error('Error while seeding');
  console.error(err.stack);
});
