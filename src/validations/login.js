const { body } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

module.exports = [
  body('email')
    .notEmpty().withMessage('El campo no puede estar vacío').bail()
    .isEmail().withMessage('Formato incorrecto, revise escritura').bail()
    .custom(async (value) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error('El email no existe');
      }
    }),

  body('password')
    .notEmpty().withMessage('El campo no puede estar vacío').bail()
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (!user || !bcrypt.compareSync(value, user.dataValues.Pass)) {
        throw new Error('Contraseña incorrecta');
      }
    })
];

