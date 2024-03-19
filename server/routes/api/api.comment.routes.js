const router = require("express").Router();
const { Comment, User, Post, PostLike } = require("../../db/models");

router.post("/", async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    await Comment.create({
      userId: res.locals.user.id,
      postId,
      content,
      parentId: postId,
    });

    const post = await Post.findOne({
      where: { id: postId },
      include: [
        { model: User },
        { model: Comment, include: { model: User } },
        { model: PostLike },
      ],
    });
    res.json({
      post,
    });
  } catch ({ message }) {
    res.json({ type: "comment router", message });
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    // console.log(postId);
    const admin = await User.findOne({ where: { isAdmin: true } });
    let result
    if( admin.id === res.locals.user.id ) {
        result = await Comment.destroy({ where: { id: commentId } })
    } else {
      result = await Comment.destroy({ where: { id: commentId, userId: res.locals.user.id } });
    }

    if (result > 0) {
      res.json({ message: "success", commentId });
      return;
    }
    res.json({ message: "нельзя DELComment" });
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
