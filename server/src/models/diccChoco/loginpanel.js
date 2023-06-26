import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const LoginPanel = sequelize.define('LoginPanel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rol: {
    type: DataTypes.STRING
  },
  contrasena: {
    type: DataTypes.STRING
  },
  agregar_mf: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  editar_mf: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  eliminar_mf: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  aprobar_pu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  eliminar_pu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tokenCode: {
    type: DataTypes.STRING}
}, { timestamps: false });

// Array con los datos a insertar
const usersData = [
  {
    rol: 'MF_Admin',
    contrasena: '12345678',
    agregar_mf: true,
    editar_mf: true,
    eliminar_mf: true,
    aprobar_pu: true,
    eliminar_pu: true,
    tokenCode: '12345678'
  }
];

sequelize.sync()
  .then(async () => {
    const promises = usersData.map(async userData => {
      const { rol, contrasena, ...userDataValues } = userData;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
      
      return LoginPanel.findOrCreate({
        where: { rol },
        defaults: { contrasena: hashedPassword, ...userDataValues }
      });
    });

    await Promise.all(promises);

    console.log('Datos insertados exitosamente!');
    // Aquí puedes realizar otras operaciones con las tablas
  })
  .catch(err => {
    console.error('Error al crear las tablas y insertar los datos:', err);
  });