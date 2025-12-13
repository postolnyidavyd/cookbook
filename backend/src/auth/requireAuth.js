const jwt= require("jsonwebtoken");
//Створюємо свій middleWare для захищених рутів
function requireAuth(req, res, next) {
  // Отримуємо header з токеном
  const header = req.headers.authorization || "";
  //Дістаєм токен
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if(!token) return res.status(401).json({message:"No access token"})

  try {
    //декодуєм токен і повертаємо payload
    const tokenPayload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = {id: tokenPayload.sub, username: tokenPayload.username};
    next();
  }catch{
    return res.status(401).json({ message: 'Invalid/expired access token' });

  }
}

module.exports = { requireAuth };