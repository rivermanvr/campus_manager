const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

// ***** Campuses Routes *****

router.get('/', (req, res, next) => {
  models.Campus.campusFindAll()
    .then(campuses => {
      res.send(campuses);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  models.Campus.campusFindById(req.params.id)
    .then(campus => {
      res.send(campus);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  models.Campus.create({
    name: req.body.name,
    photo: req.body.photo,
    phone: req.body.phone
  })
  .then(campus => {
    res.send(campus);
  })
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  models.Campus.findById(req.params.id)
    .then(campus => {
      campus.name =  req.body.name;
      campus.photo = req.body.photo;
      campus.phone = req.body.phone;
      return campus.save();
    })
  .then(campus => {
    res.send(campus);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  models.Campus.campusRemove(req.params.id)
  res.sendStatus(204);
});

module.exports = router;
