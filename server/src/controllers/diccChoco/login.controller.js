//const express = require('express');
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginPanel } from "../../models/diccChoco/loginpanel.js";

const secretKey = process.env.JWT_SECRET || 'mfSecret_mf';
const saltRounds = 10;

export const iniciarSesion = async (req, res) => {
  try {
    const { rol, contrasena } = req.body;

    // Buscar al usuario en la base de datos
    const user = await LoginPanel.findOne({
      where: {
        rol: rol
      }
    });

    if (!user) {
      // Usuario no encontrado, enviar respuesta de error
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña del usuario
    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!passwordMatch) {
      // Contraseña incorrecta, enviar respuesta de error
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token de acceso
    const token = jwt.sign({ userId: user.id }, secretKey);


    // Enviar el token y el usuario sin la contraseña como respuesta
    res.json({ token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}
// Ruta protegida para obtener datos de usuario
export const getRolData = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, secretKey);

    // Obtener el userId del token decodificado
    const userId = decodedToken.userId;

    // Buscar al usuario en la base de datos por su ID
    const user = await LoginPanel.findOne({ where: { id: userId}, attributes: ['rol',
    'agregar_mf',
    'editar_mf',
    'eliminar_mf',
    'aprobar_pu',
    'eliminar_pu'] });

    if (!user) {
      // Usuario no encontrado, enviar respuesta de error
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Usuario encontrado, enviar respuesta con los datos del usuario
    res.json({ user });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const registro = async (req, res) => {
  try {
    const { rol, contrasena } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await LoginPanel.findOne({
      where: {
        rol: rol
      }
    });

    if (existingUser) {
      // Usuario ya existe, enviar respuesta de error
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Crear el nuevo usuario en la base de datos
    const newUser = new LoginPanel({ rol, contrasena: hashedPassword });
    await newUser.save();

    // Enviar respuesta de éxito
    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error de servidor' });
  }
}