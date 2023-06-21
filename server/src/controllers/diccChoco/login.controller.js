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
      const user = await LoginPanel.findOne({where:{
        rol: rol
    }});
  
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
      const token = jwt.sign({ userId: rol._id }, secretKey);
  
      // Enviar el token como respuesta
      res.json({ token, user:rol });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error de servidor' });
    }
  }

  export const registro = async (req, res) => {
    try {
      const { rol, contrasena } = req.body;
  
      // Verificar si el usuario ya existe en la base de datos
      const existingUser = await LoginPanel.findOne({where:{
        rol: rol
    }});
  
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