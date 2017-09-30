const db = require( './db' );

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
    defaultValue: '/assets/images/Campus-Gargolye-v1.jpeg',
    set(value) {
      if (!value) this.setDataValue('photo', '/assets/images/Campus-Gargolye-v1.jpeg');
      else this.setDataValue('photo', value);
    }
  },
  phone: db.Sequelize.STRING,
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  }
};

const defineOptions = {};

const Student = db.define('student', defineAttr, defineOptions);

module.exports = Student;
