const db = require( './db' );
const Student = require( './Student' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  photo: {
    type: db.Sequelize.STRING,
    defaultValue: '/assets/images/default-photo.jpg',
    set(value) {
      if (!value) this.setDataValue('photo', '/assets/images/default-photo.jpg');
      else this.setDataValue('photo', value);
    }
  },
  phone: {
    type: db.Sequelize.STRING,
    defaultValue: ''
  }
};

const defineOptions = {};

const Campus = db.define('campus', defineAttr, defineOptions);

Campus.campusFindAll = function () {
  return this.findAll({
    include: [{ model: Student }],
    order: ['name']
  })
}

Campus.campusFindById = function (id) {
  return this.findAll({
    where: { id },
    include: [ { model: Student }]
  })
}

// Campus.campusRemove = function (id) {
//   this.campusFindById(id)
//     .then(campus => {
//       console.log(campus[0].students.length, campus)
//       if (campus[0].students.length) {
//         const promiseArr = campus[0].students.map(student => {
//           student.campusId = 1;
//           return student.save();
//         })
//         return Promise.all(promiseArr);
//       } else {
//         return null;
//       }
//     })
//     .then(() => this.destroy({ where: { id } }))
// }

Campus.campusRemove = function (id) {
  this.campusFindById(id)
  .then(_campus => {
    const campus = _campus[0];
    const promiseArr = [];
    promiseArr.push(this.destroy({ where: { id: id * 1 } }));
    console.log(campus.students.length, campus)
    if (campus.students.length) {
      campus.students.forEach(student => {
        student.campusId = 1;
        promiseArr.push(student.save());
      })
    }
    return Promise.all(promiseArr);
  })
}

module.exports = Campus;
