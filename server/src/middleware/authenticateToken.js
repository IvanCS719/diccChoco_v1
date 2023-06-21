import { verify } from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'mfSecret_mf'; // Clave secreta utilizada para firmar los tokens

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    // Token no proporcionado, enviar respuesta de error
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  // Verificar y decodificar el token
  verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Error de verificación del token, enviar respuesta de error
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Token válido, continuar con la solicitud
    req.userId = decoded.userId; // Almacenar el ID del usuario en el objeto de solicitud
    next();
  });
};

export default authenticateToken;