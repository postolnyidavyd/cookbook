const jwt = require("jsonwebtoken");
const {ACCESS_EXPIRES, REFRESH_EXPIRES}= require("../config");
//передаєм користувача з бази даних
function signAccessToken(user) {
  return jwt.sign(
    // sub - кого стосується токен
    { sub: user._id.toString(), username: user.username },
    // секретний ключ
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    //Токен який буде використовуватися для рефрешу коротрострокових
    { sub: user._id.toString(), vers: user.tokenVersion },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES }
  );
}
//відправка кукі на фронт, в httpOnly для безпеки
function sendRefreshCookie(res, refreshToken) {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax', // тільки при безпечній навігації
    path: '/api/auth/refresh',//cookie доступні тільки в цьому endpoint
    maxAge: 2592000000,// 30 днів
  });
}

function clearRefreshCookie(res) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/api/auth/refresh',
  });
}

module.exports = { signAccessToken, signRefreshToken, sendRefreshCookie, clearRefreshCookie };