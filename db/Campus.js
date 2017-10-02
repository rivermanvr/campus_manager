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

Campus.campusRemove = function (id) {
  this.campusFindById(id)
    .then(campus => {
      const promiseArr = campus[0].students.map(student => {
        student.campusId = 1;
        return student.save();
      })
      return Promise.all(promiseArr);
    })
    .then(() => this.destroy({ where: { id } }))
}

module.exports = Campus;
