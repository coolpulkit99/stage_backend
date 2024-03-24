const express = require('express');

const router = express.Router();
const { celebrate: validate } = require('celebrate');

const controller = require('../controllers/list');
const { authorize } = require('../middlewares/auth');
const validations = require('../validations/list.validation');

router
  .route('/add')
  .post(
    authorize(),
    validate(validations.addToList, { allowUnknown: true }),
    controller.addToList,
  );

router
  .route('/delete')
  .delete(
    authorize(),
    validate(validations.deleteFromList, { allowUnknown: true }),
    controller.deleteFromList,
)

router
  .route('/fetch')
  .get(
    authorize(),
    validate(validations.fetchList, { allowUnknown: true }),
    controller.fetchUserContentList,
  );

module.exports = router;
