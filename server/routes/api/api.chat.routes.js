const router = require('express').Router();
const { User, Message, Dialog, sequelize } = require('../../db/models');
const { Op } = require("sequelize");


router.get('/', async (req, res) => {
  const dialogs = await Dialog.findAll({
    where: {
      [Op.or]: [
        { userId1: res.locals.user.id },
        { userId2: res.locals.user.id }
      ]
    },
    include: [{ model: User, as: 'User2' },
    { model: User, as: 'User1' },
    Message
  ],
  });
  dialogs.map((dialog) => {
    if (dialog.User2.id === res.locals.user.id) {
      delete dialog.dataValues.User2
    } else if (dialog.User1.id === res.locals.user.id) {
      delete dialog.dataValues.User1
    }
  })
  res.json({ dialogs })
})


module.exports = router