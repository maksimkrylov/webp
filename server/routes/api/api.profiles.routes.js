const router = require('express').Router();
const { User } = require('../../db/models');
const multer = require('multer');
router.get('/', async (req, res) => {
  try {
    const profiles = await User.findAll();
    res.json({ profiles });
  } catch ({ message }) {
    res.json({ type: 'profiles router', message });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profileImg/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post('/', upload.single('img'), async (req, res) => {
  try {
    let newFale;
    const { name, email, img, city, contact, birthDate } = req.body;

    if (!req.file) {
      const some = await User.findOne({ where: { email } });
      newFale = some.img;
    } else {
      newFale = `/profileImg/${req.file.originalname}`;
    }

    const [result] = await User.update(
      { name, email, img: newFale, city, contact, birthDate },
      { where: { id: res.locals.user.id } }
    );

    if (result > 0) {
      const editProfile = await User.findOne({
        where: { id: res.locals.user.id },
      });

      res.json({ profile: editProfile });
    }
  } catch ({ message }) {
    res.json({ type: 'profiles router', message });
  }
});

module.exports = router;
