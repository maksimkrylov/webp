const jwt = require('jsonwebtoken');
const generateTokens = require('../utils/authUtils');
const configJWT = require('./configJWT');

function verifyRefreshToken(req, res, next) {
  try {
    // достаем refresh токен
    const { refresh } = req.cookies;
    // проверяем refresh token по секретному слову
    const { user } = jwt.verify(refresh, 'R');
    // генерируем новую пару токенов
    const { accessToken, refreshToken } = generateTokens({
      user: { id: user.id, img: user.img, name: user.name },
    });
    // дополняем объект ответа userом
    res.locals.user = user;
    // дополняем объект ответа новой парой токенов, положив их в куки
    res.cookie(configJWT.refresh.type, refreshToken, {
      maxAge: configJWT.refresh.expiresIn,
      httpOnly: true,
    });
    res.cookie(configJWT.access.type, accessToken, {
      maxAge: configJWT.access.expiresIn,
      httpOnly: true,
    });
    next();
  } catch (error) {
    // чистим куки refresha и accessa на клиенте
    res.clearCookie(configJWT.access).clearCookie(configJWT.refresh);
    next();
  }
}

function verifyAccessToken(req, res, next) {
  try {
    // достаем access куку из запроса
    const { access } = req.cookies;
    // проверяем по секретному слову доступ к access и достаем usera
    const { user } = jwt.verify(access, 'A');
    // дополняем объект ответа userом
    res.locals.user = user;
    next();
  } catch (error) {
    // пробуем проверить refresh токен
    verifyRefreshToken(req, res, next);
  }
}

module.exports = { verifyAccessToken };
