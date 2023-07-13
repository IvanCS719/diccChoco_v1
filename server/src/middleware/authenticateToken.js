import jwt from 'jsonwebtoken'; // Importa el módulo 'jsonwebtoken' usando el nombre de importación 'jwt'

const secretKey = process.env.JWT_SECRET || 'mfSecret_mf';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.userId = decoded.userId;
    next();
  });
};

export default authenticateToken;
