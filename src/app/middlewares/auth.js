import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: true, message: "Token não fornecido." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, "secreta");
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: true, message: "Token inválido." });
  }
};
