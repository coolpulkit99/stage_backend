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
