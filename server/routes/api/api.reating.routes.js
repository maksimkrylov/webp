const router = require('express').Router();
const { Post } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['likes', 'DESC']],
      limit: 8,
    });
    res.json({ posts });
    return;
  } catch ({ message }) {
    res.json({ type: 'posts router', message });
  }
});

module.exports = router;
