import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('db_mercadofacil', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});