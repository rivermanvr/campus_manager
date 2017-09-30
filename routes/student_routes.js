const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

// ***** Students Routes *****

router.get('/', (req, res, next) => {
  models.Student.findAll({
    include: [{ model: models.Campus }],
    order: ['name']
  })
  .then(students => {
    res.send(students);
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  models.Student.findAll({
    where: { id: req.params.id },
    include: [ { model: models.Campus }]
  })
  .then(student => {
    res.send(student);
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  models.Student.create({
    name: req.body.name,
    photo: req.body.photo,
    phone: req.body.phone,
    email: req.body.email,
    campusId: req.body.campusId
  })
  .then(student => {
    res.send(student);
  })
  .catch(next);
});

router.put('/:id/campus', (req, res, next) => {
  models.Student.findById(req.params.id)
    .then(student => {
      student.campusId = 1;
      return student.save();
    })
  .then(student => {
    res.send(student);
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  models.Student.findById(req.params.id)
    .then(student => {
      student.name = req.body.name;
      student.photo = req.body.photo;
      student.phone = req.body.phone;
      student.email = req.body.email;
      student.campusId = req.body.campusId;
      return student.save();
    })
  .then(student => {
    res.send(student);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  models.Student.destroy({
    where: { id: req.params.id }
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});

module.exports = router;
