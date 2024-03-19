const router = require('express').Router();
const { Post, User, Comment, PostLike, Favorite } = require('../../db/models');
const { Op } = require('sequelize');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/sort', async (req, res) => {
  try {
    console.log(req.body);
    const { text } = req.body;
    const posts = await Post.findAll({
      where: { content: { [Op.substring]: `%${text}` } },
      order: [['id', 'DESC']],
      include: [
        { model: User },
        { model: Comment, include: { model: User }, order: [['id', 'DESC']] },
        { model: PostLike },
        { model: Favorite },
      ],
    });
    console.log(posts);
    res.json({ posts });
    return;
  } catch ({ message }) {
    res.json({ type: 'posts router', message });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        { model: User },
        { model: Comment, include: { model: User }, order: [['id', 'DESC']] },
        { model: PostLike },
        { model: Favorite },
      ],
    });
    res.json({ posts });
    return;
  } catch ({ message }) {
    res.json({ type: 'posts router', message });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    let newFileUrl;
    const { title, content } = req.body;

    if (!req.file) {
      newFileUrl = '';
    } else {
      newFileUrl = `/image/${req.file.originalname}`;
    }

    const postmin = await Post.create({
      userId: res.locals.user.id,
      title,
      content,
      likes: 0,
      img: newFileUrl,
    });
    const post = await Post.findOne({
      where: { id: postmin.id },
      include: [
        { model: User },
        { model: Comment, include: { model: User } },
        { model: PostLike },
        { model: Favorite },
      ],
    });

    res.json({
      post,
    });
  } catch ({ message }) {
    res.json({ type: 'post router', message });
  }
});

router.delete('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    // console.log(postId);
    const result = await Post.destroy({ where: { id: postId } });
    if (result > 0) {
      res.json({ message: 'success', postId });
      return;
    }
    res.json({ message: 'Не твоя, вот ты и бесишься' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/like', async (req, res) => {
  try {
    const { userId, postId, like } = req.body;

    const findpost = await PostLike.findOne({
      where: { userId: userId, postId: postId },
    });

    if (!findpost) {
      await PostLike.create({
        userId,
        postId,
      });

      const postUpdate = await Post.findOne({ where: { id: postId } });
      if (postUpdate) {
        await postUpdate.update({ likes: like + 1 });
      }

      const post = await Post.findOne({
        where: { id: postId },
        include: [
          { model: User },
          { model: Comment, include: { model: User } },
          { model: PostLike },
          { model: Favorite },
        ],
      });

      console.log(post);

      res.json({
        post,
      });
    }
    return;
  } catch ({ message }) {
    res.json({ type: 'post router', message });
  }
});

router.delete('/dislike/:postId', async (req, res) => {
  try {
    const { postId } = req.params;

    const postUpdate = await Post.findOne({ where: { id: postId } });
    if (postUpdate) {
      await postUpdate.update({ likes: postUpdate.likes - 1 });
    }

    const result = await PostLike.destroy({
      where: { postId: postId, userId: res.locals.user.id },
    });
    if (result > 0) {
      res.json({ message: 'success', postId });
      return;
    }
    res.json({ message: 'Не сработал dislike' });
  } catch ({ message }) {
    res.json({ message });
  }
});
router.delete('/disfavorites/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const result = await Favorite.destroy({
      where: { postId: postId, userId: res.locals.user.id },
    });
    if (result > 0) {
      res.json({ message: 'success', postId });
      return;
    }
    res.json({ message: 'Не сработал DisFavorites' });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/favorites', async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const findpost = await Favorite.findOne({
      where: { userId: userId, postId: postId },
    });

    if (!findpost) {
      await Favorite.create({
        userId,
        postId,
      });
      const post = await Post.findOne({
        where: { id: postId },
        include: [
          { model: User },
          { model: Comment, include: { model: User } },
          { model: PostLike },
          { model: Favorite },
        ],
      });
      res.json({
        post,
      });
    }
    return;
  } catch ({ message }) {
    res.json({ type: 'post router favorites', message });
  }
});

module.exports = router;
