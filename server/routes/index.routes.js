const express = require('express');
const router = express.Router();

const apiAuthRouter = require('./api/api.auth.routes');
const apiPostsRouter = require('./api/api.posts.routes');
const apiProfileRouter = require('./api/api.profiles.routes');
const apiCommentRouter = require('./api/api.comment.routes');
const apiChatRouter = require('./api/api.chat.routes')
const apiReatingRouter = require('./api/api.reating.routes');


router.use('/api/auth', apiAuthRouter);
router.use('/api/posts', apiPostsRouter);
router.use('/api/comment', apiCommentRouter);
router.use('/api/profiles', apiProfileRouter);
router.use('/api/chat', apiChatRouter);
router.use('/api/reating', apiReatingRouter);


module.exports = router;
